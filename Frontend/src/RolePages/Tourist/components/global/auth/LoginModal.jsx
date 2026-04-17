import { API_BASE } from '../../../../../config/api';
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function LoginModal({ close }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/api/tourist/login`,
        form
      );

      // SAVE USER + TOKEN FIRST
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");

      close(); // close modal properly

      // SAFE RELOAD AFTER CLOSING MODAL
      setTimeout(() => {
        window.location.reload();
      }, 150);

    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl relative animate-fadeIn">

        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-600 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition font-semibold disabled:bg-green-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
