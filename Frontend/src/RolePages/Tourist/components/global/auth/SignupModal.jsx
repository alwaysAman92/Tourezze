import { API_BASE } from '../../../../../config/api';
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function SignupModal({ close }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/api/tourist/signup`,
        form
      );

      // SAVE USER & TOKEN FIRST
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup successful!");

      close(); // CLOSE MODAL

      // SAFE SINGLE RELOAD (no race condition)
      setTimeout(() => {
        window.location.reload();
      }, 150);

    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl relative animate-fadeIn">

        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-600 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-4"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition disabled:bg-green-500"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

      </div>
    </div>
  );
}
