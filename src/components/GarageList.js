import { useState, useEffect } from "react";
import "./GarageList.css";
import { allMockGarages, calculateDistance, getLocalTime } from "../data/mockData";
import { formatPrice } from "../data/currencyData";
import AIChat from "./AIChat";
import CompareGarages from "./CompareGarages";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function GarageList({ onSelectGarage }) {
  const [garages, setGarages] = useState([]);
  const [allGarages, setAllGarages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [availableCountries, setAvailableCountries] = useState([]);
  const [radiusFilter, setRadiusFilter] = useState(20); // Default 20km
  const [radiusFilterEnabled, setRadiusFilterEnabled] = useState(false); // Off by default
  const [showRadiusFilter, setShowRadiusFilter] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = () => {
      const favs = JSON.parse(localStorage.getItem('favoriteGarages') || '[]');
      setFavorites(favs);
    };
    loadFavorites();
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  const handleToggleFavorite = (garageId, e) => {
    e.stopPropagation();
    toggleFavorite(garageId);
    const favs = JSON.parse(localStorage.getItem('favoriteGarages') || '[]');
    setFavorites(favs);
  };

  // Apply filters whenever dependencies change
  useEffect(() => {
    if (allGarages.length > 0) {
      let filtered = allGarages;

      // Apply favorites filter
      if (showFavoritesOnly) {
        filtered = filtered.filter((garage) => favorites.includes(garage.id));
      }

      // Apply country filter
      if (selectedCountry !== "all") {
        filtered = filtered.filter((garage) => garage.country === selectedCountry);
      }

      // Apply radius filter only if enabled
      if (radiusFilterEnabled && userLocation && userLocation.lat !== 0) {
        filtered = filtered.filter((garage) => garage.distance <= radiusFilter);
      }

      setGarages(filtered);
    }
  }, [allGarages, selectedCountry, radiusFilter, radiusFilterEnabled, userLocation, showFavoritesOnly, favorites]);

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
          await getCountryFromCoordinates(userLoc.lat, userLoc.lng);
          
          filterAndSortGarages(userLoc);
        },
        (error) => {
          console.log("Location access denied, showing all garages");
          // If location denied, show all garages sorted by a default location
          const defaultLoc = { lat: 0, lng: 0 };
          setUserLocation(defaultLoc);
          filterAndSortGarages(defaultLoc, null, true);
        }
      );
    } else {
      // Browser doesn't support geolocation, show all garages
      const defaultLoc = { lat: 0, lng: 0 };
      setUserLocation(defaultLoc);
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
    let garagesWithDistance = allMockGarages.map((garage) => ({
      ...garage,
      distance: calculateDistance(userLoc.lat, userLoc.lng, garage.lat, garage.lng),
    }));

    // Extract unique countries for the dropdown
    const countries = [...new Set(allMockGarages.map((g) => g.country))].sort();
    setAvailableCountries(countries);

    // Always show all countries by default
    setSelectedCountry("all");
    
    // Enable radius filter if user has valid location
    if (userLoc.lat !== 0 && userLoc.lng !== 0) {
      setShowRadiusFilter(true);
    }

    // Sort by distance
    const sortedGarages = garagesWithDistance.sort((a, b) => a.distance - b.distance);

    setAllGarages(sortedGarages);
    setLoading(false);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    
    // Calculate distances for all garages
    let garagesWithDistance = allMockGarages.map((garage) => ({
      ...garage,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        garage.lat,
        garage.lng
      ),
    }));

    // Filter by selected country
    if (country !== "all") {
      garagesWithDistance = garagesWithDistance.filter(
        (garage) => garage.country === country
      );
    }

    // Sort by distance
    const sortedGarages = garagesWithDistance.sort((a, b) => a.distance - b.distance);

    setAllGarages(sortedGarages);
    
    // Clear search when changing country
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // Reset to filtered garages based on current filters
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchLower = query.toLowerCase();
    
    // Generate suggestions from landmarks, services, and locations
    const landmarkSuggestions = [];
    const serviceSuggestions = new Set();
    const locationSuggestions = new Set();
    
    allGarages.forEach((garage) => {
      // Collect landmark suggestions
      garage.landmarks.forEach((landmark) => {
        if (landmark.toLowerCase().includes(searchLower)) {
          landmarkSuggestions.push({
            type: "landmark",
            text: landmark,
            garage: garage.name,
            garageId: garage.id,
          });
        }
      });
      
      // Collect service suggestions
      garage.services.forEach((service) => {
        if (service.toLowerCase().includes(searchLower)) {
          serviceSuggestions.add(service);
        }
      });
      
      // Collect location suggestions
      if (garage.city.toLowerCase().includes(searchLower)) {
        locationSuggestions.add(`${garage.city}, ${garage.country}`);
      }
    });
    
    // Combine all suggestions
    const allSuggestions = [
      ...landmarkSuggestions.slice(0, 5),
      ...[...serviceSuggestions].slice(0, 3).map((s) => ({ type: "service", text: s })),
      ...[...locationSuggestions].slice(0, 3).map((l) => ({ type: "location", text: l })),
    ];
    
    setSuggestions(allSuggestions);
    setShowSuggestions(allSuggestions.length > 0);

    // Filter garages
    const filtered = allGarages.filter((garage) => {
      return (
        garage.name.toLowerCase().includes(searchLower) ||
        garage.city.toLowerCase().includes(searchLower) ||
        garage.country.toLowerCase().includes(searchLower) ||
        garage.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
        garage.services.some((s) => s.toLowerCase().includes(searchLower)) ||
        garage.description.toLowerCase().includes(searchLower) ||
        garage.landmarks.some((l) => l.toLowerCase().includes(searchLower))
      );
    });

    setGarages(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    handleSearch(suggestion.text);
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
          <h2>😔 No garages found</h2>
          <p>Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="garage-list-container">
      <header className="header">
        <h1>🚗 Find Your Garage</h1>
        <p>
          {garages.length} garage{garages.length !== 1 ? "s" : ""} found
          {selectedCountry !== "all" && ` in ${selectedCountry}`}
        </p>
        {userLocation && userLocation.lat !== 0 && (
          <p className="location-note">
            📍 Showing garages
            {selectedCountry !== "all" && ` in ${selectedCountry}`}
          </p>
        )}
        
        <div className="header-actions">
          <button 
            className="action-button"
            onClick={() => setShowCompare(true)}
          >
            ⚖️ Compare
          </button>
          <button 
            className={`action-button ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            ⭐ Favorites ({favorites.length})
          </button>
        </div>
      </header>

      <div className="filters-section">
        <div className="country-selector">
          <label htmlFor="country-select">🌍 Country:</label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="country-dropdown"
          >
            <option value="all">All Countries</option>
            {availableCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {showRadiusFilter && (
          <div className="radius-filter">
            <div className="radius-header">
              <label htmlFor="radius-toggle" className="radius-toggle-label">
                <input
                  type="checkbox"
                  id="radius-toggle"
                  checked={radiusFilterEnabled}
                  onChange={(e) => setRadiusFilterEnabled(e.target.checked)}
                  className="radius-checkbox"
                />
                <span>📍 Filter by Distance</span>
              </label>
            </div>
            
            {radiusFilterEnabled && (
              <>
                <div className="radius-value">Radius: {radiusFilter} km</div>
                <input
                  type="range"
                  id="radius-slider"
                  min="5"
                  max="100"
                  step="5"
                  value={radiusFilter}
                  onChange={(e) => setRadiusFilter(Number(e.target.value))}
                  className="radius-slider"
                />
                <div className="radius-labels">
                  <span>5 km</span>
                  <span>100 km</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, service, landmark, or location..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery && setShowSuggestions(true)}
        />
        {searchQuery && (
          <button 
            className="clear-search"
            onClick={() => handleSearch("")}
          >
            ✕
          </button>
        )}
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-icon">
                  {suggestion.type === "landmark" && "📍"}
                  {suggestion.type === "service" && "🔧"}
                  {suggestion.type === "location" && "🌍"}
                </span>
                <div className="suggestion-content">
                  <div className="suggestion-text">{suggestion.text}</div>
                  {suggestion.garage && (
                    <div className="suggestion-garage">Near {suggestion.garage}</div>
                  )}
                </div>
                <span className="suggestion-type">{suggestion.type}</span>
              </div>
            ))}
          </div>
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
              <button 
                className={`favorite-btn ${isFavorite(garage.id) ? 'favorited' : ''}`}
                onClick={(e) => handleToggleFavorite(garage.id, e)}
                aria-label="Toggle favorite"
              >
                {isFavorite(garage.id) ? '❤️' : '🤍'}
              </button>
              <img 
                src={garage.image} 
                alt={garage.name}
                onError={(e) => {
                  // Fallback to gallery images if main image fails
                  if (garage.gallery && garage.gallery.length > 0) {
                    e.target.src = garage.gallery[0];
                    e.target.onerror = () => {
                      if (garage.gallery[1]) {
                        e.target.src = garage.gallery[1];
                        e.target.onerror = () => {
                          if (garage.gallery[2]) {
                            e.target.src = garage.gallery[2];
                          }
                        };
                      }
                    };
                  }
                }}
              />
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

      {/* AI Chat Assistant */}
      <AIChat 
        garages={garages} 
        onSelectGarage={onSelectGarage}
        userLocation={userLocation}
      />

      {/* Compare Garages Modal */}
      {showCompare && (
        <CompareGarages 
          garages={garages}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}

export default GarageList;
