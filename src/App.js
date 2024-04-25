// src/App.js

import React, { useState } from 'react';
import './App.css';
import CountryDropdown from './components/CountryDropdown';
import HistoricalData from './components/HistoricalData';
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const handleSelectCountry = countryCode => {
    setSelectedCountry(countryCode);
  };

  return (
    <div className='main'>
      <header>
        <h1>COVID-19 and Population Dashboard</h1>
      </header>
      <div className="container">
        <div className="dropdown-container">
          <CountryDropdown onSelectCountry={handleSelectCountry} />
        </div>
        <HistoricalData selectedCountry={selectedCountry} />
        <div className='chart'>
        <LineChart selectedCountry={selectedCountry} />
        <DoughnutChart selectedCountry={selectedCountry} /> 
        </div>
      </div>
    </div>
  );
};

export default App;
