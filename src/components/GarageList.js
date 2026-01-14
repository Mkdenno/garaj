import { useState, useEffect } from "react";
import "./GarageList.css";
import { mockGarages, calculateDistance, getLocalTime } from "../data/mockData";

function GarageList({ onSelectGarage }) {
  const [garages, setGarages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchRadius] = useState(50); // Default 50km radius

  useEffect(() => {
    // Get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          filterAndSortGarages(userLoc);
        },
        (error) => {
          console.log("Location access denied, showing all garages");
          // If location denied, show all garages sorted by a default location
          const defaultLoc = { lat: 0, lng: 0 };
          setUserLocation(defaultLoc);
          filterAndSortGarages(defaultLoc, true);
        }
      );
    } else {
      // Browser doesn't support geolocation, show all garages
      const defaultLoc = { lat: 0, lng: 0 };
      setUserLocation(defaultLoc);
      filterAndSortGarages(defaultLoc, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterAndSortGarages = (userLoc, showAll = false) => {
    // Calculate distances for all garages
    const garagesWithDistance = mockGarages.map((garage) => ({
      ...garage,
      distance: calculateDistance(userLoc.lat, userLoc.lng, garage.lat, garage.lng),
    }));

    // Filter by radius (only if location is available)
    const filteredGarages = showAll
      ? garagesWithDistance
      : garagesWithDistance.filter((garage) => garage.distance <= searchRadius);

    // Sort by distance
    const sortedGarages = filteredGarages.sort((a, b) => a.distance - b.distance);

    setGarages(sortedGarages);
    setLoading(false);
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
        </p>
        {userLocation && userLocation.lat !== 0 && (
          <p className="location-note">
            📍 Showing garages within {searchRadius} km
          </p>
        )}
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for services or location..."
          className="search-input"
        />
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
                <span className="price">{garage.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GarageList;
