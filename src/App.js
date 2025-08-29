import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AuthoPage from "./Modules/Auth/Pages/AuthoPage";
import HomePage from "./Modules/Browsing/Pages/HomePage";
import Navbar from "./Modules/Shared/Components/Navbar";
import PostScreen from "./Modules/Browsing/Pages/PostScreen";
import Account from "./Modules/Account/Pages/Account";
import ChatPage from "./Modules/Chat/Page/ChatPage";
import { AuthProvider } from "./Modules/Auth/Context/authContext";
import { AccountProvider } from "./Modules/Account/context/accountContext";
import { PostProvider } from "./Modules/Browsing/context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotifProvider } from "./Modules/Shared/Context/notificationsContext";
import { SearchPage } from "./Modules/Browsing/Pages/SearchPage";
import { NavProvider } from "./Modules/Shared/Context/SearchContext";
import AdminRoute from "./Admin/AdminRoute";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import ProtectedRoute from "./Admin/Pages/ProtectedRoute";
const queryClient = new QueryClient();

// import SignUpPage from "./Pages/SignUpPage"; // Ensure this component exists

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <NavProvider>
            <NotifProvider>
              <AccountProvider>
                <PostProvider>
                  <Routes>
                    <Route path="/:page" element={<AuthoPage />} />

                    <Route element={<MainLayout />}>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <HomePage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/post/:postid"
                        element={
                          <ProtectedRoute>
                            <PostScreen />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile/:username"
                        element={
                          <ProtectedRoute>
                            <Account />
                          </ProtectedRoute>
                        }
                      />
                      {/* <Route path="/chat/:userId" element={<ChatPage />} /> */}
                      <Route
                        path="/search"
                        element={
                          <ProtectedRoute>
                            <SearchPage />{" "}
                          </ProtectedRoute>
                        }
                      />

                      {/* Admin page */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute role="Admin">
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />
                    </Route>
                  </Routes>
                </PostProvider>
              </AccountProvider>
            </NotifProvider>
          </NavProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
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
