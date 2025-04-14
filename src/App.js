import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/Modules/Auth/Pages/LoginPage";
// import SignUpPage from "./Pages/SignUpPage"; // Ensure this component exists

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
