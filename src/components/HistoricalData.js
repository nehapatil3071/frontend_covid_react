// components/HistoricalData.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoricalData.css';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import StatisticalCard from './StatisticalCard';

const HistoricalData = ({ selectedCountry }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setError(null);

      try {
        const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=1500`);
        setHistoricalData(response.data.timeline);
      } catch (error) {
        setError('Error fetching historical data');
      }

      
    };

    if (selectedCountry) {
      fetchHistoricalData();
    } else {
      setHistoricalData(null);
    }
  }, [selectedCountry]);

  
  if (error) return <div>Error: {error}</div>;
  if (!historicalData) return null;

  const totalCases = Object.values(historicalData.cases).reduce((acc, cur) => acc + cur, 0);
  const totalRecoveries = Object.values(historicalData.recovered).reduce((acc, cur) => acc + cur, 0);
  const totalDeaths = Object.values(historicalData.deaths).reduce((acc, cur) => acc + cur, 0);

  const lineChartData = {
    labels: Object.keys(historicalData.cases),
    datasets: [
      {
        label: 'Total Cases',
        data: Object.values(historicalData.cases),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Cases', 'Recoveries', 'Deaths'],
    datasets: [
      {
        data: [totalCases, totalRecoveries, totalDeaths],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className='data'>
    <div className="historical-data">
      <StatisticalCard title="Total Cases" value={totalCases} className="blue" />
      <StatisticalCard title="Recoveries" value={totalRecoveries} className="green"/>
      <StatisticalCard title="Deaths" value={totalDeaths} className="red"/>
      </div>
      <LineChart data={lineChartData} />
      <DoughnutChart data={pieChartData} />
    
    </div>
  );
};

export default HistoricalData;
