import "./GarageDetail.css";
import { getLocalTime } from "../data/mockData";

function GarageDetail({ garage, onBack }) {
  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${garage.lat},${garage.lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="garage-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="detail-content">
        <div className="detail-header">
          <img src={garage.image} alt={garage.name} className="detail-main-image" />
          <div className="header-overlay">
            <h1>{garage.name}</h1>
            <div className="header-meta">
              <span className="distance-large">📍 {garage.distance} km away</span>
              <span className="rating-large">⭐ {garage.rating} ({garage.reviews})</span>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <section className="info-section">
            <h2>About This Garage</h2>
            <p>{garage.description}</p>
          </section>

          <section className="info-section">
            <h2>Specialties</h2>
            <div className="specialty-tags">
              {garage.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">{specialty}</span>
              ))}
            </div>
          </section>

          <section className="info-section">
            <h2>Services Offered</h2>
            <ul className="services-list">
              {garage.services.map((service, index) => (
                <li key={index}>✓ {service}</li>
              ))}
            </ul>
          </section>

          <section className="info-section">
            <h2>Nearby Landmarks</h2>
            <div className="landmarks">
              {garage.landmarks.map((landmark, index) => (
                <div key={index} className="landmark-item">
                  <span className="landmark-icon">📍</span>
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="info-section">
            <h2>Gallery</h2>
            <div className="gallery">
              {garage.gallery.map((image, index) => (
                <img key={index} src={image} alt={`Gallery ${index + 1}`} className="gallery-image" />
              ))}
            </div>
          </section>

          <section className="info-section contact-section">
            <h2>Contact Information</h2>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div>
                <strong>Local Time:</strong> {getLocalTime(garage.timezone)}
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Phone:</strong> {garage.phone}
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email:</strong> {garage.email}
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <div>
                <strong>Hours:</strong> {garage.hours}
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Location:</strong> {garage.city}, {garage.country}
              </div>
            </div>
          </section>

          <button className="directions-button" onClick={handleGetDirections}>
            Get Directions on Google Maps 🗺️
          </button>
        </div>
      </div>
    </div>
  );
}

export default GarageDetail;
