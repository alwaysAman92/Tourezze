import { API_BASE } from '../../../config/api';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VendorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Login Failed ❌");
        return;
      }

      // Store login flag
      localStorage.setItem("vendorLogin", "true");

      alert("Login Successful! 🎉");
      console.log("Vendor Login:", data);

      // Redirect after login
      navigate("/role/vendor");
    } catch (err) {
      setLoading(false);
      alert("Server Error / CORS Issue ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl">

        {/* TITLE */}
        <h1 className="text-2xl text-center font-bold text-emerald-800">
          Vendor Login
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="vendor@example.com"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            required
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/role/vendor/signup"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
