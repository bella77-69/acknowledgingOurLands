// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { PageContainer } from "../../Components/Layouts";
// import { Card, Button } from "../../Components/UI";
// import "leaflet/dist/leaflet.css";

// const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
// const apiKeyLand = import.meta.env.VITE_NATIVE_LAND_API_KEY;

// const DiscoverLands = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [city, setCity] = useState("Loading...");
//   const [indigenousLands, setIndigenousLands] = useState([]);
//   const [error, setError] = useState(null);
//   const [currentAcknowledgmentIndex, setCurrentAcknowledgmentIndex] =
//     useState(0);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setLongitude(longitude);
//           fetchCityData(latitude, longitude);
//           fetchIndigenousLands(latitude, longitude);
//         },
//         (err) => setError(err.message || "Location access denied.")
//       );
//     } else {
//       setError("Geolocation is not supported in this browser.");
//     }
//   }, []);

//   const fetchIndigenousLands = async (lat, lng) => {
//     try {
//       const res = await axios.get(
//         `https://native-land.ca/api/index.php?maps=territories&position=${lat},${lng}&key=${apiKeyLand}`
//       );
//       setIndigenousLands(res.data || []);
//     } catch {
//       setError("Could not fetch Indigenous Lands data.");
//     }
//   };

//   const fetchCityData = async (lat, lng) => {
//     try {
//       const res = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
//       );
//       const components = res.data.results[0]?.components;
//       setCity(
//         components?.city ||
//           components?.town ||
//           components?.village ||
//           "City data not found"
//       );
//     } catch {
//       setCity("City data could not be retrieved.");
//     }
//   };

//   const acknowledgmentVariations = [
//     "I am honored to be a guest on the traditional and unceded territories of the ",
//     "I acknowledge that I am on the traditional and unceded territories of the ",
//     "Today, we gather on the ancestral lands of the ",
//     "We are grateful to gather on the traditional and unceded territories of the ",
//     "We are gathered on the traditional and unceded territories of the ",
//     "We are meeting on the traditional and unceded territories of the ",
//   ];

//   const changeAcknowledgment = () => {
//     setCurrentAcknowledgmentIndex(
//       (prev) => (prev + 1) % acknowledgmentVariations.length
//     );
//   };

//   const handleSaveAcknowledgment = async () => {
//     if (!indigenousLands.length) return;
//     setIsSaving(true);
//     setSaveSuccess(false);
//     setError(null);

//     try {
//       if (!token) {
//         navigate("/login", { state: { from: "/discover" } });
//         return;
//       }

//       const territoryNames = indigenousLands
//         .map((l) => l?.properties?.Name)
//         .filter(Boolean)
//         .join(", ");

//       const acknowledgmentText = `${acknowledgmentVariations[currentAcknowledgmentIndex]}${territoryNames} First Nations.`;

//       await axios.post(
//         "http://localhost:5000/api/acknowledgments",
//         {
//           title: `Acknowledgment for ${city}`,
//           content: acknowledgmentText,
//           territory: territoryNames,
//           traditionalKeepers: territoryNames,
//           isPublic: false,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSaveSuccess(true);
//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save acknowledgment");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <PageContainer className="py-6 sm:py-8 lg:py-12 relative">
//       <div className="absolute top-32 -left-16 lg:left-28 w-60 h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
//       <div className="absolute top-0 right-0 w-48 h-48 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
//       <div className="absolute bottom-0 left-4 lg:left-8 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

//       <div className="text-center mb-10 px-4">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
//           Discover Indigenous Lands
//         </h1>
//         <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
//           Learn about the Indigenous territories you are on by identifying your
//           location and exploring the history of the land.
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
//         <div className="flex-1 flex flex-col gap-6">
//           <Card className="relative z-10">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
//               Your Current Location
//             </h2>
//             {latitude && longitude ? (
//               <p className="text-gray-700 dark:text-gray-300">
//                 <strong>City:</strong> {city} <br />
//                 <strong>Coordinates:</strong> Latitude: {latitude}, Longitude:{" "}
//                 {longitude}
//               </p>
//             ) : (
//               <p className="text-red-500">{error || "Fetching location..."}</p>
//             )}
//           </Card>

//           <Card className="relative z-10">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
//               Indigenous Lands
//             </h2>
//             {indigenousLands.length > 0 ? (
//               indigenousLands.map((land, idx) => (
//                 <div key={idx} className="mt-2">
//                   <strong className="text-gray-800 dark:text-gray-100">
//                     {land?.properties?.Name || "Unknown Land"}
//                   </strong>

//                   <p className="text-gray-600 dark:text-gray-400">
//                     <a
//                       href={land?.properties?.description}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:underline text-blue-600 dark:text-blue-400"
//                     >
//                       {land?.properties?.description ||
//                         "No description available"}
//                     </a>
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-700 dark:text-gray-300">
//                 No Indigenous Lands data available.
//               </p>
//             )}
//           </Card>
//         </div>

//         <div className="flex-1 relative z-10">
//           {latitude && longitude ? (
//             <MapContainer
//               center={[latitude, longitude]}
//               zoom={13}
//               className="h-72 sm:h-96 lg:h-[450px] w-full rounded-lg shadow-md"
//             >
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               <Marker position={[latitude, longitude]}>
//                 <Popup>
//                   You are here: {latitude}, {longitude}
//                 </Popup>
//               </Marker>
//             </MapContainer>
//           ) : (
//             <Card className="flex items-center justify-center h-72 sm:h-96 lg:h-[450px] w-full">
//               <p className="text-gray-700 dark:text-gray-300">
//                 Map will appear here once location is fetched.
//               </p>
//             </Card>
//           )}
//         </div>
//       </div>

//       <div className="mt-8 text-center">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
//           Land Acknowledgment
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 mb-4">
//           {acknowledgmentVariations[currentAcknowledgmentIndex]}
//           {indigenousLands.map((land, idx) => (
//             <React.Fragment key={land?.properties?.Name || idx}>
//               {idx > 0 && ", "}
//               {land?.properties?.Name || "Unknown Land"}
//             </React.Fragment>
//           ))}
//           {" First Nations."}
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <Button onClick={changeAcknowledgment}>
//             Generate New Acknowledgment
//           </Button>

//           {token ? (
//             <Button
//               onClick={handleSaveAcknowledgment}
//               disabled={isSaving || !indigenousLands.length}
//               className={
//                 isSaving || !indigenousLands.length
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }
//             >
//               {isSaving ? "Saving..." : "Save Acknowledgment"}
//             </Button>
//           ) : (
//             <Button
//               onClick={() =>
//                 navigate("/login", { state: { from: "/discover" } })
//               }
//             >
//               Sign in to Save
//             </Button>
//           )}
//         </div>

//         {saveSuccess && (
//           <p className="text-green-600 dark:text-green-400 mt-2">
//             Acknowledgment saved successfully!
//           </p>
//         )}
//         {error && (
//           <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>
//         )}
//       </div>
//     </PageContainer>
//   );
// };

// export default DiscoverLands;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { PageContainer } from "../../Components/Layouts";
import { Card, Button } from "../../Components/UI";
import "leaflet/dist/leaflet.css";

// Only public env var: your backend URL
const API_URL = import.meta.env.VITE_API_URL;

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
  const token = localStorage.getItem("token");

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
        (err) => setError(err.message || "Location access denied.")
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  const fetchCityData = async (lat, lng) => {
    try {
      const res = await axios.get(`${API_URL}/api/city?lat=${lat}&lng=${lng}`);
      const components = res.data.results[0]?.components;
      setCity(
        components?.city ||
          components?.town ||
          components?.village ||
          "City data not found"
      );
    } catch {
      setCity("City data could not be retrieved.");
    }
  };

  const fetchIndigenousLands = async (lat, lng) => {
    try {
      const res = await axios.get(`${API_URL}/api/lands?lat=${lat}&lng=${lng}`);
      // Make sure it's an array
      const lands = Array.isArray(res.data) ? res.data : [];
      setIndigenousLands(lands);
    } catch {
      setError("Could not fetch Indigenous Lands data.");
      setIndigenousLands([]);
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
    setCurrentAcknowledgmentIndex(
      (prev) => (prev + 1) % acknowledgmentVariations.length
    );
  };

  const handleSaveAcknowledgment = async () => {
    if (!indigenousLands.length) return;
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      if (!token) {
        navigate("/login", { state: { from: "/discover" } });
        return;
      }

      const territoryNames = indigenousLands
        .map((l) => l?.properties?.Name)
        .filter(Boolean)
        .join(", ");

      const acknowledgmentText = `${acknowledgmentVariations[currentAcknowledgmentIndex]}${territoryNames} First Nations.`;

      await axios.post(
        `${API_URL}/api/acknowledgments`,
        {
          title: `Acknowledgment for ${city}`,
          content: acknowledgmentText,
          territory: territoryNames,
          traditionalKeepers: territoryNames,
          isPublic: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save acknowledgment");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageContainer className="py-6 sm:py-8 lg:py-12 relative">
      {/* Background circles */}
      <div className="absolute top-32 -left-16 lg:left-28 w-60 h-60 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-4 lg:left-8 w-32 h-32 bg-customNav opacity-5 rounded-full backdrop-blur-sm"></div>

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Discover Indigenous Lands
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Learn about the Indigenous territories you are on by identifying your
          location and exploring the history of the land.
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col gap-6">
          {/* Location Card */}
          <Card className="relative z-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Your Current Location
            </h2>
            {latitude && longitude ? (
              <p className="text-gray-700 dark:text-gray-300">
                <strong>City:</strong> {city} <br />
                <strong>Coordinates:</strong> Latitude: {latitude}, Longitude:{" "}
                {longitude}
              </p>
            ) : (
              <p className="text-red-500">{error || "Fetching location..."}</p>
            )}
          </Card>

          {/* Indigenous Lands Card */}
          <Card className="relative z-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Indigenous Lands
            </h2>
            {indigenousLands.length > 0 ? (
              indigenousLands.map((land, idx) => (
                <div key={idx} className="mt-2">
                  <strong className="text-gray-800 dark:text-gray-100">
                    {land?.properties?.Name || "Unknown Land"}
                  </strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a
                      href={land?.properties?.description}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-600 dark:text-blue-400"
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
          </Card>
        </div>

        {/* Map */}
        <div className="flex-1 relative z-10">
          {latitude && longitude ? (
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              className="h-72 sm:h-96 lg:h-[450px] w-full rounded-lg shadow-md"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  You are here: {latitude}, {longitude}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <Card className="flex items-center justify-center h-72 sm:h-96 lg:h-[450px] w-full">
              <p className="text-gray-700 dark:text-gray-300">
                Map will appear here once location is fetched.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Land Acknowledgment Section */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Land Acknowledgment
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {acknowledgmentVariations[currentAcknowledgmentIndex]}
          {indigenousLands.map((land, idx) => (
            <React.Fragment key={land?.properties?.Name || idx}>
              {idx > 0 && ", "}
              {land?.properties?.Name || "Unknown Land"}
            </React.Fragment>
          ))}
          {" First Nations."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={changeAcknowledgment}>
            Generate New Acknowledgment
          </Button>

          {token ? (
            <Button
              onClick={handleSaveAcknowledgment}
              disabled={isSaving || !indigenousLands.length}
              className={
                isSaving || !indigenousLands.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              {isSaving ? "Saving..." : "Save Acknowledgment"}
            </Button>
          ) : (
            <Button
              onClick={() =>
                navigate("/login", { state: { from: "/discover" } })
              }
            >
              Sign in to Save
            </Button>
          )}
        </div>

        {saveSuccess && (
          <p className="text-green-600 dark:text-green-400 mt-2">
            Acknowledgment saved successfully!
          </p>
        )}
        {error && (
          <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>
        )}
      </div>
    </PageContainer>
  );
};

export default DiscoverLands;
