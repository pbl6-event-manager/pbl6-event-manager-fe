// reducers/locationReducer.ts
interface LocationState {
  countries: string[];
  cities: string[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  countries: [],
  cities: [],
  loading: false,
  error: null,
};

export const locationReducer = (state = initialState, action: any): LocationState => {
  switch (action.type) {
    case "FETCH_COUNTRIES_REQUEST":
    case "FETCH_CITIES_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_COUNTRIES_SUCCESS":
      return { ...state, loading: false, countries: action.payload };

    case "FETCH_CITIES_SUCCESS":
      return { ...state, loading: false, cities: action.payload };

    case "FETCH_COUNTRIES_FAILURE":
    case "FETCH_CITIES_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
