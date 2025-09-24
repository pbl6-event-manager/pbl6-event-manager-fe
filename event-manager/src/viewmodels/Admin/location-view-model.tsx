// viewmodels/useLocationViewModel.ts
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, fetchCities } from "../../store/actions/Admin/location-action";
import type { RootState } from "../../store/store";
import { useEffect } from "react";

export const useLocationViewModel = (country: string) => {
  const dispatch = useDispatch();
  const { countries, cities, loading, error } = useSelector(
    (state: RootState) => state.location
  );

  // Lấy countries 1 lần khi web load
  useEffect(() => {
    dispatch<any>(fetchCountries());
  }, [dispatch]);

  // Khi country thay đổi thì fetch cities
  useEffect(() => {
    if (country) {
      dispatch<any>(fetchCities(country));
    }
  }, [country, dispatch]);

  return {
    countries,
    cities,
    loading,
    error,
  };
};
