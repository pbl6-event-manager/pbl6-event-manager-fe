import React from "react";
import { useLocationViewModel } from "../../viewmodels/Admin/location-view-model";
import type { CountryCitySelectProps } from "../../models/component-props/country-city-component-props";

const CountryCitySelect: React.FC<CountryCitySelectProps> = ({ country, city, onChange }) => {
  const { countries, cities, loading } = useLocationViewModel(country);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block font-medium mb-1">Country</label>
        <select
          value={country}
          onChange={(e) => onChange(e.target.value, "")} // reset city
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">-- Select Country --</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">City</label>
        <select
          value={city}
          onChange={(e) => onChange(country, e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
          disabled={!country}
        >
          <option value="">-- Select City --</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CountryCitySelect;
