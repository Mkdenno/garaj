import './PrintButton.css';

function PrintButton({ garage }) {
  const handlePrint = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${garage.name} - Garage Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #2d3748;
            margin: 0 0 10px 0;
          }
          .header p {
            color: #718096;
            margin: 5px 0;
          }
          .section {
            margin: 30px 0;
          }
          .section h2 {
            color: #667eea;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 12px;
            margin: 15px 0;
          }
          .info-label {
            font-weight: bold;
            color: #4a5568;
          }
          .info-value {
            color: #2d3748;
          }
          .services-list {
            list-style: none;
            padding: 0;
          }
          .services-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .services-list li:before {
            content: "✓ ";
            color: #48bb78;
            font-weight: bold;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #718096;
            font-size: 0.9rem;
            border-top: 2px solid #e2e8f0;
            padding-top: 20px;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${garage.name}</h1>
          <p>📍 ${garage.city}, ${garage.country}</p>
          <p>⭐ ${garage.rating} Rating (${garage.reviews} Reviews)</p>
          <p>🚗 ${garage.distance} km away</p>
        </div>

        <div class="section">
          <h2>Contact Information</h2>
          <div class="info-grid">
            <div class="info-label">Phone:</div>
            <div class="info-value">${garage.phone}</div>
            
            <div class="info-label">Email:</div>
            <div class="info-value">${garage.email}</div>
            
            <div class="info-label">Hours:</div>
            <div class="info-value">${garage.hours}</div>
            
            <div class="info-label">Location:</div>
            <div class="info-value">${garage.city}, ${garage.country}</div>
          </div>
        </div>

        <div class="section">
          <h2>About</h2>
          <p>${garage.description}</p>
        </div>

        <div class="section">
          <h2>Specialties</h2>
          <p>${garage.specialties.join(' • ')}</p>
        </div>

        <div class="section">
          <h2>Services Offered</h2>
          <ul class="services-list">
            ${garage.services.map(service => `<li>${service}</li>`).join('')}
          </ul>
        </div>

        <div class="section">
          <h2>Nearby Landmarks</h2>
          <ul class="services-list">
            ${garage.landmarks.map(landmark => `<li>${landmark}</li>`).join('')}
          </ul>
        </div>

        <div class="footer">
          <p>Printed from Garage Finder App</p>
          <p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <button 
      className="print-button"
      onClick={handlePrint}
      aria-label="Print garage details"
    >
      🖨️ Print/PDF
    </button>
  );
}

export default PrintButton;
