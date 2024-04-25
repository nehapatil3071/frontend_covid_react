import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ selectedCountry }) => {
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/all');
        console.log('Response:', response.data);
        setCountryData(response.data);
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

  const { cases, recovered, deaths } = countryData;
  

  const lineChartData = {
    labels: ['Cases', 'Recoveries', 'Deaths'],
    datasets: [
      {
        data: [cases, recovered, deaths],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
 

  return (
    <div className="Line-chart">
      <h2>Pie Chart for {selectedCountry}</h2>
      <Line data={lineChartData} />
    </div>
  );
};

export default LineChart;
