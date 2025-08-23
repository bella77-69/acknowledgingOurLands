import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
const apiKeyLand = import.meta.env.VITE_NATIVE_LAND_API_KEY;

const DiscoverLands = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("Loading...");
  const [indigenousLands, setIndigenousLands] = useState([]);
  const [error, setError] = useState(null);
  const [currentAcknowledgmentIndex, setCurrentAcknowledgmentIndex] =
    useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

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
        `https://native-land.ca/api/index.php?maps=territories&position=${latitude},${longitude}&key=${apiKeyLand}`
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

  const handleSaveAcknowledgment = async () => {
    if (!indigenousLands.length) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: "/discover" } });
        return;
      }

      const territoryNames = indigenousLands
        .map((land) => land?.properties?.Name)
        .filter(Boolean)
        .join(", ");

      const acknowledgmentText = `${acknowledgmentVariations[currentAcknowledgmentIndex]}${territoryNames} First Nations.`;

      const payload = {
        title: `Acknowledgment for ${city}`,
        content: acknowledgmentText,
        territory: territoryNames,
        traditionalKeepers: territoryNames,
        isPublic: false,
      };

      await axios.post("http://localhost:5000/api/acknowledgments", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving acknowledgment:", error);
      setError(
        error.response?.data?.message || "Failed to save acknowledgment"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-customWhite to-gray-100 dark:from-darkNav dark:to-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl tracking-tight font-extrabold text-active dark:text-customWhite sm:text-4xl">
            Discover Indigenous Lands
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Learn about the Indigenous territories you are on by identifying
            your location and exploring the history of the land.
          </p>
        </div>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Location and Lands Info */}
          <div className="relative space-y-8 lg:pr-8">
            {/* Circle Background */}
            <div className="absolute -top-8 -left-4 lg:-top-16 lg:-left-8 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full"></div>

            {/* Location Details */}
            <div className="bg-customWhite dark:bg-gray-900 shadow rounded-lg p-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Your Current Location
              </h2>
              {latitude && longitude ? (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  <strong>City:</strong> {city} <br />
                  <strong>Coordinates:</strong> Latitude: {latitude}, Longitude:{" "}
                  {longitude}
                </p>
              ) : (
                <p className="text-red-500">
                  {error || "Fetching location..."}
                </p>
              )}
            </div>

            {/* Indigenous Lands */}
            <div className="bg-customWhite dark:bg-gray-900 shadow rounded-lg p-6 relative z-10">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Indigenous Lands
              </h2>
              {indigenousLands.length > 0 ? (
                indigenousLands.map((land, index) => (
                  <div key={index} className="mt-4">
                    <strong className="text-gray-800 dark:text-gray-100">
                      {land?.properties?.Name || "Unknown Land"}
                    </strong>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a
                        href={land?.properties?.description}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {land?.properties?.description ||
                          "No description available"}
                      </a>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  No Indigenous Lands data available.
                </p>
              )}
            </div>
            {/* Circle Background */}
            <div className="absolute -bottom-8 -right-4 lg:-bottom-0 lg:-right-20 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full"></div>
          </div>

          {/* Right Column: Map */}
          <div className="relative lg:col-span-1 mt-8">
            {/* Circle Background
            <div className="absolute -top-2 -right-4 lg:-top-0 lg:-right-20 w-40 h-40 lg:w-60 lg:h-60 bg-customNav opacity-20 rounded-full"></div> */}
            {latitude && longitude ? (
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                className="h-[450px] w-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={[latitude, longitude]}>
                  <Popup>
                    You are here: {latitude}, {longitude}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-[450px]">
                <p className="text-textGreyDark dark:text-textGrey">
                  Map will appear here once location is fetched.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Land Acknowledgment Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Land Acknowledgment
          </h2>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
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

          {/* <button
            onClick={changeAcknowledgment}
            className="bg-customNav text-customWhite font-bold py-3 px-6 rounded-lg mt-3 hover:bg-buttonHover hover:text-customWhite transition ease-in-out duration-300"
          >
            Generate New Acknowledgment
          </button> */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={changeAcknowledgment}
              className="bg-customNav text-customWhite font-bold py-3 px-6 rounded-lg hover:bg-buttonHover transition duration-300"
            >
              Generate New Acknowledgment
            </button>

            <button
              onClick={handleSaveAcknowledgment}
              disabled={isSaving || !indigenousLands.length}
              className={`bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 ${
                isSaving || !indigenousLands.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSaving ? "Saving..." : "Save Acknowledgment"}
            </button>
          </div>

          {/* Add status messages */}
          <div className="mt-4 text-center">
            {saveSuccess && (
              <p className="text-green-600 dark:text-green-400">
                Acknowledgment saved successfully!
              </p>
            )}
            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverLands;
