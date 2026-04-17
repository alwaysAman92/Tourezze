import { API_BASE } from '../../../config/api';


import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function VendorSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    category: "",
    address: "",
    phone: "",
    aadhaarNumber: ""
  });

  const [aadhaarFile, setAadhaarFile] = useState(null); 
  const [aadhaarPreview, setAadhaarPreview] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  const MAX_FILE_SIZE = 5 * 1024 * 1024; 
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((s) => ({ ...s, [name]: value.replace(/[^\d]/g, "") }));
    } else if (name === "aadhaarNumber") {
      setForm((s) => ({ ...s, [name]: value.replace(/[^\d\s]/g, "") }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setAadhaarFile(null);
      setAadhaarPreview(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(f.type)) {
      setErrors((err) => ({ ...err, aadhaarFile: "Please upload JPG/PNG image or PDF only." }));
      setAadhaarFile(null);
      setAadhaarPreview(null);
      return;
    }

    if (f.size > MAX_FILE_SIZE) {
      setErrors((err) => ({ ...err, aadhaarFile: "File too large. Max 5 MB allowed." }));
      setAadhaarFile(null);
      setAadhaarPreview(null);
      return;
    }

    setAadhaarFile(f);
    setErrors((err) => ({ ...err, aadhaarFile: "" }));

    // preview for images only
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setAadhaarPreview(reader.result);
      reader.readAsDataURL(f);
    } else {
      setAadhaarPreview(null);
    }
  };

  // convert File -> base64 (returns base64 string without data:<mime>;base64, prefix)
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result; // data:<mime>;base64,<data>
      if (typeof result !== "string") return reject(new Error("Invalid file read result"));
      const parts = result.split(",");
      resolve(parts[1]); // return only base64 part
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  // simple Aadhaar validation: 12 digits
  const validateAadhaar = (value) => {
    const digits = (value || "").replace(/\s+/g, "");
    return /^\d{12}$/.test(digits);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    if (!form.shopName.trim()) newErrors.shopName = "Shop name is required.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit phone number.";
    if (aadhaarFile && !form.aadhaarNumber) newErrors.aadhaarNumber = "Enter Aadhaar number when uploading card.";
    if (form.aadhaarNumber && !validateAadhaar(form.aadhaarNumber)) newErrors.aadhaarNumber = "Aadhaar must be 12 digits.";
    if (aadhaarFile && !ALLOWED_TYPES.includes(aadhaarFile.type)) newErrors.aadhaarFile = "Invalid file type.";
    if (aadhaarFile && aadhaarFile.size > MAX_FILE_SIZE) newErrors.aadhaarFile = "File too large. Max 5 MB.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // Build payload
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        shopName: form.shopName,
        category: form.category,
        address: form.address,
        phone: form.phone,
        aadhaarNumber: form.aadhaarNumber ? form.aadhaarNumber.replace(/\s+/g, "") : undefined
      };

      // If file present, convert to base64 and attach fields for JSON upload (no FormData)
      if (aadhaarFile) {
        const base64 = await fileToBase64(aadhaarFile); // may throw
        // OPTIONAL: check size in base64 form, avoid too large payloads
        if (!base64 || base64.length > 15 * 1024 * 1024) { // ~15MB guard
          setLoading(false);
          return alert("Aadhaar file too large after encoding.");
        }
        payload.aadhaarFileBase64 = base64; // backend expects this field
        payload.aadhaarFileType = aadhaarFile.type;
        payload.aadhaarFileName = aadhaarFile.name;
      }

      // Send JSON to backend (route: POST /api/vendor/signup)
      const res = await fetch(`${API_BASE}/api/vendor/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Signup Failed ❌");
        return;
      }

      alert("Vendor Account Created Successfully! ✅");

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        shopName: "",
        category: "",
        address: "",
        phone: "",
        aadhaarNumber: ""
      });
      setAadhaarFile(null);
      setAadhaarPreview(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Server Error / CORS Issue ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 w-full max-w-3xl p-8">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-emerald-800">Vendor Sign Up</h1>
          <p className="text-gray-500 text-sm mt-1">Register your handicraft shop.</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Owner Name"
            required
            className="input border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            required
            className="input border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            placeholder="Shop Name"
            required
            className="input border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="input border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Category</option>
            <option>Iron Craft</option>
            <option>Dokra Metal Art</option>
            <option>Bamboo Craft</option>
            <option>Handloom</option>
            <option>Tribal Jewellery</option>
          </select>

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Ranchi, Jharkhand"
            required
            className="input border rounded-lg px-3 py-2 md:col-span-2 focus:ring-2 focus:ring-emerald-500"
          />

          {/* Aadhaar number input */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Aadhaar Number (optional)</label>
              <input
                type="text"
                name="aadhaarNumber"
                value={form.aadhaarNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012"
                maxLength={14}
                className="input border rounded-lg px-3 py-2 mt-1 w-full focus:ring-2 focus:ring-emerald-500"
              />
              {errors.aadhaarNumber && <p className="text-xs text-red-600 mt-1">{errors.aadhaarNumber}</p>}
              <p className="text-xs text-gray-400 mt-1">Enter 12 digits. You can upload card below.</p>
            </div>

            {/* Aadhaar file upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">Upload Aadhaar Card (image / pdf)</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="mt-1"
              />
              {errors.aadhaarFile && <p className="text-xs text-red-600 mt-1">{errors.aadhaarFile}</p>}
              <p className="text-xs text-gray-400 mt-1">Max 5 MB. JPG / PNG / PDF.</p>

              {aadhaarPreview && (
                <div className="mt-2 border rounded-md p-2 bg-gray-50">
                  <p className="text-xs text-gray-600 mb-2">Preview:</p>
                  <img src={aadhaarPreview} alt="Aadhaar preview" className="max-h-40 object-contain" />
                </div>
              )}
            </div>
          </div>

          <button
            className="md:col-span-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Vendor Account"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/role/vendor/login"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
