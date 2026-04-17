import { API_BASE } from '../../../../config/api';
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Package comes from BookingPage via router state
  const { selectedPackage } = location.state || {};

  // ✅ Safety check: If user directly opens payment page
  if (!selectedPackage) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>No package selected</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // ✅ This function calls your backend Stripe API
  const handleStripePayment = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/payments/create-checkout-session`,
        {
          packageId: selectedPackage._id,
          name: selectedPackage.packageName,
          price: selectedPackage.price,
        }
      );

      // ✅ Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Stripe payment error:", error);
      alert("Failed to start Stripe payment");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Confirm Your Booking
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <strong>Package:</strong> {selectedPackage.packageName}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Location:</strong> {selectedPackage.location}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Duration:</strong> {selectedPackage.duration}
        </div>

        <div style={{ marginBottom: "25px", fontSize: "20px", fontWeight: "700" }}>
          Total Amount: ₹{selectedPackage.price}
        </div>

        <button
          onClick={handleStripePayment}
          style={{
            width: "100%",
            padding: "14px",
            background: "#635bff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Pay with Stripe
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            background: "#e5e7eb",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
