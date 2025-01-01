import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
        components?.city ||
        components?.town ||
        components?.village ||
        "City data not found";
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
    <section className="py-10 bg-customWhite dark:bg-darkNav sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-active dark:text-customWhite sm:text-4xl lg:text-5xl">
            Discover Indigenous Lands
          </h2>
          <p className="text-sm tracking-widest text-active dark:text-customWhite font-bold pt-4">
            Detecting your current location and displaying a map with land
            acknowledgment details.
          </p>
        </div>

        {latitude && longitude ? (
          <div className="grid items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-12 sm:mt-20">
            <div className="space-y-8">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 text-active dark:text-customWhite"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5z"
                  />
                </svg>

                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-active dark:text-customWhite">
                    Your Current Location
                  </h3>
                  <p className="mt-3 text-base text-active dark:text-customWhite">
                    Latitude: {latitude} <br />
                    Longitude:{longitude}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 text-active dark:text-customWhite"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 20.25V8.25a2.25 2.25 0 0 1 2.25-2.25h7.5a2.25 2.25 0 0 1 2.25 2.25v12"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 20.25h15"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 10.5v3.75m4.5-3.75v3.75"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 16.5h1.5V18H9zm4.5 0h1.5V18h-1.5z"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-active dark:text-customWhite">
                    City
                  </h3>
                  <p className="mt-3 text-base text-active dark:text-customWhite">
                    {city}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 text-active dark:text-customWhite"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 18.75l4.5-9 4.5 9H3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 18.75l4.5-9 4.5 9H15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15.75h7.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3.75L9.375 9h5.25L12 3.75z"
                  />
                </svg>

                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-active dark:text-customWhite">
                    Your Land Acknowledgment
                  </h3>
                  <br />
                  <Discover indigenousLands={indigenousLands} />
                </div>
              </div>
            </div>

            {/* Map Component */}
            <div className="sm:col-span-1">
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: "400px", width: "100%", marginTop: "20px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>
                    You are here: {city} <br />
                    Indigenous Lands:{" "}
                    {indigenousLands
                      .map((land) => land.properties.Name)
                      .join(", ") || "N/A"}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400 font-semibold">
            Error: {error}
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Loading location...
          </p>
        )}
      </div>
    </section>
  );
};

export default Location;
