import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <>
       <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          </Routes>

<Footer />
</BrowserRouter>
    </>
  );
}

export default App;
