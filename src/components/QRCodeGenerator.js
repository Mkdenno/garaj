import { useState } from 'react';
import './QRCodeGenerator.css';

function QRCodeGenerator({ garage }) {
  const [showQR, setShowQR] = useState(false);
  
  const garageUrl = `${window.location.origin}?garage=${garage.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(garageUrl)}`;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${garage.name.replace(/\s+/g, '-')}-QR.png`;
    link.click();
  };

  return (
    <>
      <button 
        className="qr-button"
        onClick={() => setShowQR(true)}
        aria-label="Generate QR Code"
      >
        📱 QR Code
      </button>

      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qr-close" onClick={() => setShowQR(false)}>✕</button>
            
            <h3>QR Code for {garage.name}</h3>
            <p className="qr-description">Scan to view garage details</p>
            
            <div className="qr-code-container">
              <img src={qrCodeUrl} alt="QR Code" />
            </div>

            <div className="qr-info">
              <p><strong>{garage.name}</strong></p>
              <p>📍 {garage.city}, {garage.country}</p>
              <p>⭐ {garage.rating} ({garage.reviews} reviews)</p>
            </div>

            <button className="qr-download" onClick={downloadQR}>
              ⬇️ Download QR Code
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default QRCodeGenerator;
