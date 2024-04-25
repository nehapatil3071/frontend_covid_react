import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import './PieChart.css';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend
);

const DoughnutChart = ({ selectedCountry }) => {
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/all');
        const populationResponse = await axios.get(`https://restcountries.com/v3.1/name/${selectedCountry}`);
        const covidData = response.data;
        const populationData = populationResponse.data[0]?.population;

        const { recovered, deaths } = covidData;

        setCountryData({ recovered, deaths, population: populationData });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching COVID-19 data');
      }
    };

     if (selectedCountry) {
      fetchData();
    } else {
      setCountryData(null);
    }
  }, [selectedCountry]);

 if (error) return <div>Error: {error}</div>;
  if (!countryData) return <div></div>;

  const { recovered, deaths, population } = countryData;

  const pieChartData = {
    labels: [ 'Population', 'Deaths',  'Recoveries'],
    datasets: [
      {
        data: [ recovered, deaths,population],
        backgroundColor: ['rgb(255, 205, 86)','rgb(255, 99, 132)', 'rgb(75, 192, 192)' ,'rgb(54, 162, 235)'],
        hoverOffset: 4,
        values: [538135492, 496215482, 2549759650],
      },
    ],
  };
 

  return (
    <div className="Doughnut-chart">
      <h2>Pie Chart for {selectedCountry}</h2>
      <Doughnut data={pieChartData} />
    </div>
  );
};
export default DoughnutChart;

