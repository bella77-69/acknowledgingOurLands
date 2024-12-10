import React, { useEffect, useState } from "react";
import axios from "axios";
import Discover from "./Discover";

const apiKey = import.meta.env.VITE_API_KEY;

const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("Loading...");
  const [indigenousLands, setIndigenousLands] = useState([]);
  const [error, setError] = useState(null);

  const fetchIndigenousLands = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://native-land.ca/api/index.php?maps=territories&position=${latitude},${longitude}`
      );
      setIndigenousLands(response.data || []);
    } catch (error) {
      console.error("Error fetching Indigenous Land data:", error);
      setError("Could not fetch Indigenous Lands data.");
    }
  };

  const fetchCityData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      const components = response.data.results[0]?.components;
      const cityName =
        components?.city || components?.town || components?.village || "City data not found";
      setCity(cityName);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setCity("City data could not be retrieved.");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchCityData(latitude, longitude);
          fetchIndigenousLands(latitude, longitude);
        },
        (error) => {
          setError(error.message || "Location access denied.");
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  return (
    <section className="bg-customWhite dark:bg-darkNav p-2 md:p-6">
        <div className="gap-6 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col items-center  py-6 min-h-screen">
    
      <div className="w-full max-w-4xl rounded-lg p-6">
        {latitude && longitude ? (
          <>
            <p className="text-lg font-medium text-gray-700 dark:text-customWhite mb-4">
              This page detects your current location and displays the coordinates. Additionally, the land acknowledgment section below helps you identify the traditional lands you are on, fostering awareness and respect.
            </p>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Your Current Location:</h2>

              <div className="space-y-2">
                <p className="text-gray-600 dark:text-customWhite">
                  <strong className="font-semibold">Latitude:</strong> {latitude}
                </p>
                <p className="text-gray-600 dark:text-customWhite">
                  <strong className="font-semibold">Longitude:</strong> {longitude}
                </p>
                <p className="text-gray-600 dark:text-customWhite">
                  <strong className="font-semibold">City:</strong> {city}
                </p>
              </div>
            </div>

            <div>
              <Discover indigenousLands={indigenousLands} />
            </div>
          </>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400 font-semibold">Error: {error}</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Loading location...</p>
        )}
      </div>
    </div>
    </section>
  );
};

export default Location;