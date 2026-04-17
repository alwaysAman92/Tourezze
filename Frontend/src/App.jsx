// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLanding from "./MainLanding/MainLanding";

// Role Pages
import TouristPortal from "./RolePages/Tourist/TouristPortal";
import VendorPortal from "./RolePages/Vendor/VendorPortal";
import GuidePortal from "./RolePages/Guide/GuidePortal";
import HotelPortal from "./RolePages/Hotel/HotelPortal";
import GovPortal from "./RolePages/Admin/GovPortal";

// AUTH
import VendorLogin from "./RolePages/Vendor/Auth/VendorLogin";
import GuideLogin from "./RolePages/Guide/Auth/GuideLogin";
import HotelAuth from "./RolePages/Hotel/Auth/HotelAuth";

import VendorLogout from "./RolePages/Vendor/Auth/VendorLogout";
import GuideLogout from "./RolePages/Guide/Auth/GuideLogout";
import HotelLogout from "./RolePages/Hotel/Auth/HotelLogout";

import ProtectedRoute from "./RolePages/Vendor/Auth/ProtectedRoute";
import GuideProtectedRoute from "./RolePages/Guide/Auth/GuideProtectedRoute";
import HotelProtectedRoute from "./RolePages/Hotel/Auth/HotelProtectedRoute";

import GovLogin from "./RolePages/Admin/Auth/GovLogin";
import GovLogout from "./RolePages/Admin/Auth/GovLogout";
import GovProtectedRoute from "./RolePages/Admin/Auth/GovProtectedRoute";
import VendorSignup from "./RolePages/Vendor/Auth/VendorSignup";

// Events UI
import EventList from "../src/MainLanding/components/uiEvents/EventList";      // optional: list component
import EventDetails from "../src/MainLanding/components/uiEvents/EventDetails";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">404 — Page not found</h1>
        <a href="/" className="text-green-600 underline">Go back home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLanding />} />

        {/* Public events listing + detail routes */}
        {/* If you don't have EventList just remove the EventList route */}
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/role/tourist/*" element={<TouristPortal />} />

        <Route path="/role/vendor/login" element={<VendorLogin />} />
        <Route path="/role/vendor/signup" element={<VendorSignup />} />
        <Route path="/role/vendor/logout" element={<VendorLogout />} />
        <Route
          path="/role/vendor/*"
          element={
            <ProtectedRoute>
              <VendorPortal />
            </ProtectedRoute>
          }
        />

        <Route path="/role/guide/login" element={<GuideLogin />} />
        <Route path="/role/guide/logout" element={<GuideLogout />} />
        <Route
          path="/role/guide/*"
          element={
            <GuideProtectedRoute>
              <GuidePortal />
            </GuideProtectedRoute>
          }
        />

        <Route path="/role/hotel-owner/login" element={<HotelAuth />} />
        <Route path="/role/hotel-owner/logout" element={<HotelLogout />} />
        <Route
          path="/role/hotel-owner/*"
          element={
            <HotelProtectedRoute>
              <HotelPortal />
            </HotelProtectedRoute>
          }
        />

        <Route path="/role/government/login" element={<GovLogin />} />
        <Route path="/role/government/logout" element={<GovLogout />} />
        <Route
          path="/role/government/*"
          element={
            <GovProtectedRoute>
              <GovPortal />
            </GovProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
