import { useState } from 'react';
import './App.css';
import GarageList from './components/GarageList';
import GarageDetail from './components/GarageDetail';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [selectedGarage, setSelectedGarage] = useState(null);

  return (
    <div className="App">
      <DarkModeToggle />
      {!selectedGarage ? (
        <GarageList onSelectGarage={setSelectedGarage} />
      ) : (
        <GarageDetail garage={selectedGarage} onBack={() => setSelectedGarage(null)} />
      )}
    </div>
  );
}

export default App;
