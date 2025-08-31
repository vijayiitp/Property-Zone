import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Agents from "./pages/AgentsList";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProfilePage from "./pages/UserProfile";
import PropertyListing from "./pages/Properties";
import Feedback from "./pages/Feedback";
import PropertyDetails from "./pages/PropertyDetail";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import { login } from "./features/auth/authSlice";
import { fetchProperties } from "./features/property/PropertySlice";
import { useAppDispatch } from "./app/hooks";
import AuthToggler from "./components/FormToggler";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/user/me`,
          { withCredentials: true }
        );
        const user = res.data.user;
        dispatch(login({ user }));
        if(user) {
          dispatch(fetchProperties())
            .unwrap()
            .catch((err) => console.error(err));
        }
      } catch (err) {
        console.log("No active session", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<AuthToggler />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/propertydetails/property/:id" element={<PropertyDetails />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
