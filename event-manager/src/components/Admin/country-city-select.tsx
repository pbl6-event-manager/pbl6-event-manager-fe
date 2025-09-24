import React, { useEffect, useState } from "react";
import axios from "axios";

interface CountryCitySelectProps {
  country: string;
  city: string;
  onChange: (country: string, city: string) => void;
}

const CountryCitySelect: React.FC<CountryCitySelectProps> = ({ country, city, onChange }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Lấy danh sách quốc gia khi component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
        const names = res.data.data.map((item: any) => item.country);
        setCountries(names);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Khi chọn country thì load city
  useEffect(() => {
    const fetchCities = async () => {
      if (country) {
        try {
          const res = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/cities",
            { country }
          );
          setCities(res.data.data || []);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [country]);

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
    </div>
  );
};

export default CountryCitySelect;
