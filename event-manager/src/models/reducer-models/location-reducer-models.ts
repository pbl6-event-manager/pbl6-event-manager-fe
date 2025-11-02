export interface LocationState {
  countries: string[];
  cities: string[];
  loading: boolean;
  error: string | null;
}

export const DEFAULT_LOCATION_STATE: LocationState = {
  countries: [],
  cities: [],
  loading: false,
  error: null,
};