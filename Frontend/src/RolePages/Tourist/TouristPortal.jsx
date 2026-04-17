import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../Tourist/components/global/TouistNavbar.jsx";
import LoginModal from "../Tourist/components/global/auth/LoginModal.jsx";
import SignupModal from "../Tourist/components/global/auth/SignupModal.jsx";
import Footer from "../Tourist/components/global/Footer.jsx";

import ExplorePage from "./components/Explore/pages/ExplorePage.jsx";
import Plan from "./components/Plan/Plan.jsx";
import EventsPage from "./components/events/pages/EventsPage.jsx";
import HotelsPage from "./components/Hotels/pages/HotelsPage.jsx";

// ⭐ Packages List
import AllPackages from "./components/package/AllPackage.jsx";

// ⭐ Booking + Payment
import BookingPage from "./components/package/BookingPage.jsx";
import PaymentPage from "./components/package/PaymentPage.jsx";
import PaymentSuccess from "./components/package/PaymentSuccess.jsx";
import PaymentCancel from "./components/package/PaymentCancel.jsx";

export default function Tourist() {
  const [authType, setAuthType] = useState(null);

  return (
    <>
      <Navbar setAuthType={setAuthType} />

      {authType === "login" && <LoginModal close={() => setAuthType(null)} />}
      {authType === "signup" && <SignupModal close={() => setAuthType(null)} />}

      <div className="pt-14 min-h-screen">
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="ai-itinerary" element={<Plan />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="hotels" element={<HotelsPage />} />

          {/* ⭐ All Packages Page */}
          <Route path="packages" element={<AllPackages />} />

          {/* ⭐ Booking Page */}
          <Route path="book-package/:id" element={<BookingPage />} />

          {/* ✅ Stripe Payment Flow */}
          <Route path="packages/payment" element={<PaymentPage />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
