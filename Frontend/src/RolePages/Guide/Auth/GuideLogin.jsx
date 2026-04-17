import { API_BASE } from '../../../config/api';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GuideAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // LOGIN State
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // SIGNUP State
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // INPUT HANDLERS
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleSignupChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  // ⭐ LOGIN API
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/guide/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("guide_token", data.token);

      alert("Login Successful!");

      // Redirect to Guide Dashboard
      navigate("/role/guide");

    } catch (err) {
      alert("Server error");
    }
  };

  // ⭐ SIGNUP API → Redirect only to Login
  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await fetch(`${API_BASE}/api/guide/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Signup failed");
        return;
      }

      // ⭐ Signup Successful → Go to Login
      alert("Signup Successful! Please login now.");

      // Redirect to login page
      navigate("/role/guide/login");

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-black">

        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {isLogin ? "Guide Login" : "Guide Signup"}
        </h2>

        {/* FORM */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">

          {/* SIGNUP EXTRA FIELDS */}
          {!isLogin && (
            <>
              <div>
                <label className="text-sm text-gray-600 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={signupForm.fullName}
                  onChange={handleSignupChange}
                  required
                  className="w-full border border-black rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={signupForm.phone}
                  onChange={handleSignupChange}
                  required
                  className="w-full border border-black rounded p-2 mt-1"
                />
              </div>
            </>
          )}

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={isLogin ? loginForm.email : signupForm.email}
              onChange={isLogin ? handleLoginChange : handleSignupChange}
              required
              className="w-full border border-black rounded p-2 mt-1"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={isLogin ? loginForm.password : signupForm.password}
              onChange={isLogin ? handleLoginChange : handleSignupChange}
              required
              className="w-full border border-black rounded p-2 mt-1"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-600 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                required
                className="w-full border border-black rounded p-2 mt-1"
              />
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-green-700 font-semibold cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-green-700 font-semibold cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>

      </div>
    </div>
  );
}
