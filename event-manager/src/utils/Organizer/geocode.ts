import axios from "axios";

export const getCoordinates = async (address: string, city: string, country: string) => {
  try {
    const query = `${address}, ${city}, ${country}`;
    const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

    const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: query,
        key: apiKey,
        // Không cần language, để OpenCage tự xác định
      },
    });

    if (response.data && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      console.warn("This address could not be found:", query);
      return null;
    }
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
};
