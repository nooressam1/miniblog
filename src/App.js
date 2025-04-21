import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthoPage from "./Modules/Auth/Pages/AuthoPage";
import HomePage from "./Modules/Browsing/Pages/HomePage";
import Navbar from "./Modules/Shared/Components/Navbar";
// import SignUpPage from "./Pages/SignUpPage"; // Ensure this component exists

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/:page" element={<AuthoPage />} />
        <Route path="/" element={<HomePage />} />

        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
