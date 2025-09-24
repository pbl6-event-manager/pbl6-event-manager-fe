import axios from "axios";
import type { Dispatch } from "redux";

export const fetchCountries = () => async (dispatch: Dispatch) => {
  dispatch({ type: "FETCH_COUNTRIES_REQUEST" });
  try {
    const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
    const names = res.data.data.map((item: any) => item.country);
    dispatch({ type: "FETCH_COUNTRIES_SUCCESS", payload: names });
  } catch (error: any) {
    dispatch({ type: "FETCH_COUNTRIES_FAILURE", payload: error.message });
  }
};

export const fetchCities = (country: string) => async (dispatch: Dispatch) => {
  dispatch({ type: "FETCH_CITIES_REQUEST" });
  try {
    const res = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      { country }
    );
    dispatch({ type: "FETCH_CITIES_SUCCESS", payload: res.data.data || [] });
  } catch (error: any) {
    dispatch({ type: "FETCH_CITIES_FAILURE", payload: error.message });
  }
};