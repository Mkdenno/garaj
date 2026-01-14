import { useState } from 'react';
import './CompareGarages.css';
import { formatPrice } from '../data/currencyData';

function CompareGarages({ garages, onClose }) {
  const [selectedGarages, setSelectedGarages] = useState([]);

  const toggleGarage = (garage) => {
    if (selectedGarages.find(g => g.id === garage.id)) {
      setSelectedGarages(selectedGarages.filter(g => g.id !== garage.id));
    } else if (selectedGarages.length < 3) {
      setSelectedGarages([...selectedGarages, garage]);
    }
  };

  const isSelected = (garageId) => selectedGarages.find(g => g.id === garageId);

  return (
    <div className="compare-overlay">
      <div className="compare-container">
        <div className="compare-header">
          <h2>Compare Garages</h2>
          <button className="close-compare" onClick={onClose}>✕</button>
        </div>

        {selectedGarages.length === 0 && (
          <div className="compare-empty">
            <p>Select up to 3 garages to compare</p>
            <p className="compare-hint">Click on garages below to add them</p>
          </div>
        )}

        {selectedGarages.length > 0 && (
          <div className="compare-table">
            <div className="compare-row compare-row-header">
              <div className="compare-cell"></div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  <img src={garage.image} alt={garage.name} />
                  <h3>{garage.name}</h3>
                  <button 
                    className="remove-from-compare"
                    onClick={() => toggleGarage(garage)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Location</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  {garage.city}, {garage.country}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Rating</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  ⭐ {garage.rating} ({garage.reviews} reviews)
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Distance</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  {garage.distance} km
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Price Range</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  {garage.pricing 
                    ? formatPrice(garage.pricing.min, garage.pricing.max, garage.country)
                    : "Price on request"
                  }
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Specialties</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  {garage.specialties.join(', ')}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Phone</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  <a href={`tel:${garage.phone}`}>{garage.phone}</a>
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label">Hours</div>
              {selectedGarages.map(garage => (
                <div key={garage.id} className="compare-cell">
                  {garage.hours}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="garage-selector">
          <h3>Select Garages ({selectedGarages.length}/3)</h3>
          <div className="garage-selector-grid">
            {garages.slice(0, 20).map(garage => (
              <div 
                key={garage.id}
                className={`selector-card ${isSelected(garage.id) ? 'selected' : ''}`}
                onClick={() => toggleGarage(garage)}
              >
                <img src={garage.image} alt={garage.name} />
                <div className="selector-info">
                  <h4>{garage.name}</h4>
                  <p>⭐ {garage.rating}</p>
                </div>
                {isSelected(garage.id) && <div className="selected-badge">✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareGarages;
