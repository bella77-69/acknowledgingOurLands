import React, { useEffect, useState } from "react";
const your_api_key= import.meta.env.VITE_API_KEY;

const Discover = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Latitude is :", latitude);
          console.log("Longitude is :", longitude);
        },
        (error) => setError("Location access denied.")
        
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Construct the URL for the iframe
  const embedUrl =
    latitude && longitude
      ? `https://native-land.ca/api/embed/embed.html?maps=languages,territories&position=${latitude},${longitude}&key=${your_api_key}`
      : null;

  return (
    <div className="map-container">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Native Land Map
      </h1>
 
      {error && (
        <p className="text-red-500">
          {error} Please check your browser's location permissions.
        </p>
      )}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="Native Land Map"
          allowFullScreen
        />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Discover;

