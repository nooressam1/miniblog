import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AuthoPage from "./Modules/Auth/Pages/AuthoPage";
import HomePage from "./Modules/Browsing/Pages/HomePage";
import Navbar from "./Modules/Shared/Components/Navbar";
import PostScreen from "./Modules/Browsing/Pages/PostScreen";
// import SignUpPage from "./Pages/SignUpPage"; // Ensure this component exists

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:page" element={<AuthoPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostScreen />} />
        </Route>

        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
