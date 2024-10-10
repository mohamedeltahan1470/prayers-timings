

import React from 'react';
import { Select, MenuItem } from '@mui/material';

const CountrySelector = ({ countries, selectedCountry, setSelectedCountry }) => {
  return (
    <Select
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      displayEmpty
      fullWidth
    >
      <MenuItem value="" disabled>
        اختر دولة
      </MenuItem>
      {countries.map((country) => (
        <MenuItem key={country} value={country}>
          {country}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CountrySelector;
