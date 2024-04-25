import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import './CountryDropdown.css';

const CountryDropdown = ({ onSelectCountry, onDateRangeSelect }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countriesData);
      } catch (error) {
        setError('Error fetching countries');
      }

      setLoading(false);
    };

    fetchCountries();
  }, []);

  const handleSelectCountry = event => {
    const countryCode = event.target.value;
    onSelectCountry(countryCode);
  };

  const handleDateRangeSelect = range => {
    setDateRange(range);
    onDateRangeSelect(range[0], range[1]);
  };

  if (loading) return <div> </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dropdown-container">
      <select onChange={handleSelectCountry}>
        <option value="">United States</option>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <div className="date-tab">
        <DatePicker
          selected={dateRange[0]}
          onChange={date => handleDateRangeSelect([date, dateRange[1]])}
          selectsStart
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          placeholderText="Select Date Range"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
        />
        <div className="dropdown-arrow"></div>
      </div>
    </div>
  );
};

export default CountryDropdown;
