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
    <section className="land">
      <div className="location">
        {latitude && longitude ? (
          <div className="content">
            <p className="location-heading">
              This page detects your current location and displays the
              coordinates. Additionally, the land acknowledgment section below
              helps you identify the traditional lands you are on, fostering
              awareness and respect.
            </p>
            <div className="box">
              <h2 className="location-title">Your Current Location:</h2>
              <div className="location-info">
                <p>
                  <strong>Latitude:</strong> {latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {longitude}
                </p>
                <p>
                  <strong>City:</strong> {city}
                </p>
              </div>
              <div className="land-acknowledgment-container">
              <Discover indigenousLands={indigenousLands} />
              </div>
            </div>
          </div>
        ) : error ? (
          <p className="alert alert-danger">Error: {error}</p>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    </section>
  );
};

export default Location;
