import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Main from "./Pages/Main/Main";
import About from "./Pages/About/About";
// import Discover from "./Pages/Discover/Discover";
// import Location from "./Pages/Discover/Location";
import DiscoverLands from "./Pages/Discover/DiscoverLands";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" // Check user preference on load
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode); 
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-customBlack dark:bg-darkBackground text-customWhite dark:text-darkText">
      <BrowserRouter>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/location" element={<Location />} /> */}
          <Route path="/discover" element={<DiscoverLands/>} />
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
