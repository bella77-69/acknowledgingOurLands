import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const apiKey = import.meta.env.VITE_API_KEY;

const DiscoverLands = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("Loading...");
  const [indigenousLands, setIndigenousLands] = useState([]);
  const [error, setError] = useState(null);
  const [currentAcknowledgmentIndex, setCurrentAcknowledgmentIndex] = useState(0);

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
        (error) => setError(error.message || "Location access denied.")
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  const fetchIndigenousLands = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://native-land.ca/api/index.php?maps=territories&position=${latitude},${longitude}`
      );
      setIndigenousLands(response.data || []);
    } catch {
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

  const acknowledgmentVariations = [
    "I am honored to be a guest on the traditional and unceded territories of the ",
    "I acknowledge that I am on the traditional and unceded territories of the ",
    "Today, we gather on the ancestral lands of the ",
    "We are grateful to gather on the traditional and unceded territories of the ",
    "We are gathered on the traditional and unceded territories of the ",
    "We are meeting on the traditional and unceded territories of the ",
  ];

  const changeAcknowledgment = () => {
    setCurrentAcknowledgmentIndex((prevIndex) =>
      prevIndex === acknowledgmentVariations.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-10 bg-customWhite dark:bg-darkNav sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite sm:text-4xl">
            Discover Indigenous Lands
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            This page detects your current location and displays the coordinates.
            Additionally, the land acknowledgment section below helps you identify the traditional lands you are on, fostering awareness and respect.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid gap-8 mt-10">
          {/* Top Row: Left and Right Columns */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Combined Current Location and City */}
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Your Current Location
                </h2>
                {latitude && longitude ? (
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    <strong>City:</strong> {city} <br />
                    <strong>Coordinates:</strong> Latitude: {latitude}, Longitude: {longitude}
                  </p>
                ) : (
                  <p className="text-red-500">
                    {error || "Fetching location..."}
                  </p>
                )}
              </div>

              {/* Indigenous Lands */}
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Indigenous Lands
                </h2>
                {indigenousLands.length > 0 ? (
                  indigenousLands.map((land, index) => {
                    const name = land?.properties?.Name || "Unknown Land";
                    const description = land?.properties?.description || "No description available.";
                    return (
                      <div key={index} className="mt-2">
                        <strong className="text-gray-700 dark:text-gray-200">{name}</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          <a
                            href={description}
                            className="text-gray-600 dark:text-gray-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {description}
                          </a>
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    No Indigenous Lands data available.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Map */}
            <div className="xs:mt-4 lg:mt-0">
              {latitude && longitude ? (
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={13}
                  className="h-96 w-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[latitude, longitude]}>
                    <Popup>
                      You are here: {latitude}, {longitude}
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    Map will appear here once location is fetched.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Middle Row: Land Acknowledgment */}
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
              Land Acknowledgment
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
              {acknowledgmentVariations[currentAcknowledgmentIndex]}
              <span>
                {indigenousLands.map((land, index) => (
                  <React.Fragment key={land?.properties?.Name || index}>
                    {index > 0 && ", "}
                    {land?.properties?.Name || "Unknown Land"}
                  </React.Fragment>
                ))}
              </span>
              {` First Nations.`}
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={changeAcknowledgment}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Generate New Acknowledgment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverLands;
