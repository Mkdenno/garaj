import { useState, useEffect } from "react";
import "./GarageList.css";
import { mockGarages, calculateDistance, getLocalTime } from "../data/mockData";
import { formatPrice } from "../data/currencyData";

function GarageList({ onSelectGarage }) {
  const [garages, setGarages] = useState([]);
  const [allGarages, setAllGarages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchRadius] = useState(50); // Default 50km radius
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          
          // Get country from coordinates using reverse geocoding
          const country = await getCountryFromCoordinates(userLoc.lat, userLoc.lng);
          setUserCountry(country);
          
          filterAndSortGarages(userLoc, country);
        },
        (error) => {
          console.log("Location access denied, showing all garages");
          // If location denied, show all garages sorted by a default location
          const defaultLoc = { lat: 0, lng: 0 };
          setUserLocation(defaultLoc);
          setUserCountry(null);
          filterAndSortGarages(defaultLoc, null, true);
        }
      );
    } else {
      // Browser doesn't support geolocation, show all garages
      const defaultLoc = { lat: 0, lng: 0 };
      setUserLocation(defaultLoc);
      setUserCountry(null);
      filterAndSortGarages(defaultLoc, null, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountryFromCoordinates = async (lat, lng) => {
    try {
      // Use OpenStreetMap Nominatim API for reverse geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3`
      );
      const data = await response.json();
      
      if (data && data.address && data.address.country) {
        return data.address.country;
      }
    } catch (error) {
      console.log("Could not determine country from coordinates");
    }
    return null;
  };

  const filterAndSortGarages = (userLoc, country = null, showAll = false) => {
    // Calculate distances for all garages
    let garagesWithDistance = mockGarages.map((garage) => ({
      ...garage,
      distance: calculateDistance(userLoc.lat, userLoc.lng, garage.lat, garage.lng),
    }));

    // Filter by country if available
    if (country && !showAll) {
      garagesWithDistance = garagesWithDistance.filter(
        (garage) => garage.country === country
      );
    }

    // Filter by radius (only if location is available)
    const filteredGarages = showAll
      ? garagesWithDistance
      : garagesWithDistance.filter((garage) => garage.distance <= searchRadius);

    // Sort by distance
    const sortedGarages = filteredGarages.sort((a, b) => a.distance - b.distance);

    setAllGarages(sortedGarages);
    setGarages(sortedGarages);
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setGarages(allGarages);
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = allGarages.filter((garage) => {
      return (
        garage.name.toLowerCase().includes(searchLower) ||
        garage.city.toLowerCase().includes(searchLower) ||
        garage.country.toLowerCase().includes(searchLower) ||
        garage.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
        garage.services.some((s) => s.toLowerCase().includes(searchLower)) ||
        garage.description.toLowerCase().includes(searchLower)
      );
    });

    setGarages(filtered);
  };

  if (loading) {
    return (
      <div className="garage-list-container">
        <div className="loading">
          <h2>🔍 Finding garages near you...</h2>
          <p>Getting your location</p>
        </div>
      </div>
    );
  }

  if (garages.length === 0) {
    return (
      <div className="garage-list-container">
        <header className="header">
          <h1>🚗 Find Your Garage</h1>
          <p>Worldwide garage locator</p>
        </header>
        <div className="no-results">
          <h2>😔 No garages found in your area</h2>
          <p>Try expanding your search radius or check back later</p>
          <p className="location-info">
            Searching within {searchRadius} km of your location
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="garage-list-container">
      <header className="header">
        <h1>🚗 Find Your Garage</h1>
        <p>
          {garages.length} garage{garages.length !== 1 ? "s" : ""} found near you
          {userCountry && ` in ${userCountry}`}
        </p>
        {userLocation && userLocation.lat !== 0 && (
          <p className="location-note">
            📍 Showing garages within {searchRadius} km
            {userCountry && ` • Filtered by ${userCountry}`}
          </p>
        )}
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, service, or location..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="clear-search"
            onClick={() => handleSearch("")}
          >
            ✕
          </button>
        )}
      </div>

      <div className="garages-grid">
        {garages.map((garage) => (
          <div
            key={garage.id}
            className="garage-card"
            onClick={() => onSelectGarage(garage)}
          >
            <div className="garage-image">
              <img src={garage.image} alt={garage.name} />
              <div className="distance-badge">{garage.distance} km</div>
            </div>
            <div className="garage-info">
              <h3>{garage.name}</h3>
              <div className="location-badge">
                📍 {garage.city}, {garage.country}
              </div>
              <div className="rating">
                <span className="stars">⭐ {garage.rating}</span>
                <span className="reviews">({garage.reviews} reviews)</span>
              </div>
              <p className="specialties">{garage.specialties.join(" • ")}</p>
              <div className="local-time">
                <span className="time-icon">🕐</span>
                <span className="time-text">
                  Local time: {getLocalTime(garage.timezone)}
                </span>
              </div>
              <div className="phone-number">
                <span className="phone-icon">📞</span>
                <a
                  href={`tel:${garage.phone}`}
                  className="phone-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {garage.phone}
                </a>
              </div>
              <div className="garage-footer">
                <span className="status open">Open Now</span>
                <span className="price">
                  {garage.pricing 
                    ? formatPrice(garage.pricing.min, garage.pricing.max, garage.country)
                    : "Price on request"
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GarageList;
