import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthoPage from "./Modules/Auth/Pages/AuthoPage";
// import SignUpPage from "./Pages/SignUpPage"; // Ensure this component exists

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:page" element={<AuthoPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
