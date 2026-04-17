import { API_BASE } from '../../../config/api';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HotelAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // LOGIN STATE
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // SIGNUP STATE
  const [signupForm, setSignupForm] = useState({
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // COMMON CHANGE HANDLERS
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleSignupChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  // LOGIN API
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/hotel/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("hotel_token", data.token);
      navigate("/role/hotel-owner");
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // SIGNUP API
  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await fetch(`${API_BASE}/api/hotel/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });

      const data = await res.json();
      console.log("SIGNUP RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Signup failed");
        return;
      }

      // ✔ After Signup → Go to Login Page
      alert("Signup successful! Please login now.");
      setIsLogin(true);
      setSignupForm({
        ownerName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-black">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {isLogin ? "Hotel Owner Login" : "Hotel Owner Signup"}
        </h2>

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
          
          {/* SIGNUP FIELDS */}
          {!isLogin && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={signupForm.ownerName}
                  onChange={handleSignupChange}
                  className="w-full border border-black rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={signupForm.phone}
                  onChange={handleSignupChange}
                  className="w-full border border-black rounded p-2 mt-1"
                />
              </div>
            </>
          )}

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={isLogin ? loginForm.email : signupForm.email}
              onChange={isLogin ? handleLoginChange : handleSignupChange}
              className="w-full border border-black rounded p-2 mt-1"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={isLogin ? loginForm.password : signupForm.password}
              onChange={isLogin ? handleLoginChange : handleSignupChange}
              className="w-full border border-black rounded p-2 mt-1"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                className="w-full border border-black rounded p-2 mt-1"
              />
            </div>
          )}

          <button className="w-full py-2 bg-green-700 text-white rounded-lg mt-4 hover:bg-green-800">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* TOGGLE LOGIN / SIGNUP */}
        <p className="text-center text-sm text-gray-700 mt-4">
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
