import { API_BASE } from '../../../../../config/api';
import React, { useState } from "react";
import { Upload, Eye } from "lucide-react";

export default function AddHotelForm() {
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState({
    hotelName: "",
    category: "",
    starRating: "",
    description: "",
    tags: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mapUrl: "",
    nearbyLandmarks: "",
    phone: "",
    email: "",
    website: "",
    contactPerson: "",
    arVrLink: "",
    imageLinks: "",
    coverPhoto: "",
  });

  const API_URL = `${API_BASE}/api/hotel/add`;

  // HANDLE TEXT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE COVER PHOTO
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setPreviewImage(imgURL);
      setForm({ ...form, coverPhoto: imgURL }); // OPTIONAL: Upload later
    }
  };

  // SUBMIT FORM
  const handleSubmit = async () => {
    try {
      const body = {
        ...form,
        imageLinks: form.imageLinks.split(",").map((i) => i.trim()),
        tags: form.tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("hotel_token"),
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("ADD HOTEL RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Something went wrong!");
        return;
      }

      alert("Hotel added successfully!");
      window.location.href = "/role/hotel-owner"; // dashboard

    } catch (error) {
      console.log(error);
      alert("Server error, check console");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">

      {/* LEFT SIDE FORM */}
      <div className="space-y-6">

        {/* HOTEL DETAILS */}
        <div className="border border-black rounded-lg p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Hotel Details</h2>

          <label className="text-sm text-gray-700">Hotel Name</label>
          <input
            name="hotelName"
            value={form.hotelName}
            onChange={handleChange}
            placeholder="E.g. Green Valley Resort"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          >
            <option>Select Category</option>
            <option>Hotel</option>
            <option>Resort</option>
            <option>Homestay</option>
            <option>Heritage</option>
            <option>Lodge</option>
          </select>

          <label className="text-sm text-gray-700 mt-4">Star Rating</label>
          <select
            name="starRating"
            value={form.starRating}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          >
            <option>Select Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label className="text-sm text-gray-700 mt-4">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description..."
            className="w-full mt-1 p-3 bg-white border border-black rounded h-24"
          />

          <label className="text-sm text-gray-700 mt-4">Tags</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Romantic, Family, Eco-friendly..."
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />
        </div>

        {/* LOCATION */}
        <div className="border border-black rounded-lg p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Location</h2>

          <label className="text-sm text-gray-700">Full Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full address"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City name"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State name"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Pincode</label>
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="E.g. 834001"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Google Maps URL</label>
          <input
            name="mapUrl"
            value={form.mapUrl}
            onChange={handleChange}
            placeholder="https://maps.google.com/..."
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Nearby Landmarks</label>
          <input
            name="nearbyLandmarks"
            value={form.nearbyLandmarks}
            onChange={handleChange}
            placeholder="E.g. 500m from Rock Garden"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />
        </div>

        {/* CONTACT DETAILS */}
        <div className="border border-black rounded-lg p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Contact & Booking Info</h2>

          <label className="text-sm text-gray-700">Hotel Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="hotel@mail.com"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://hotelwebsite.com"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <label className="text-sm text-gray-700 mt-4">Booking Contact Person</label>
          <input
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            placeholder="Manager name"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />
        </div>

        {/* AR/VR */}
        <div className="border border-black rounded-lg p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">360° View / AR-VR Preview</h2>

          <label className="text-sm text-gray-700">360° / AR-VR Link</label>
          <input
            name="arVrLink"
            value={form.arVrLink}
            onChange={handleChange}
            placeholder="Paste 360° view / AR-VR URL"
            className="w-full mt-1 p-3 bg-white border border-black rounded"
          />

          <p className="text-gray-500 text-xs mt-2">
            Example: https://my360tour.com/view/abc123
          </p>
        </div>

        {/* PHOTOS */}
        <div className="border border-black rounded-lg p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Photos / Media</h2>

          <label className="text-sm text-gray-700">Image URLs (comma separated)</label>
          <textarea
            name="imageLinks"
            value={form.imageLinks}
            onChange={handleChange}
            placeholder="https://img1.jpg, https://img2.png"
            className="w-full mt-1 p-3 bg-white border border-black rounded h-20"
          />

          <label className="w-full h-60 mt-4 border border-black border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
            <Upload className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700 text-sm mt-2">Upload Cover Photo</span>
            <input type="file" onChange={handleFile} className="hidden" />
          </label>
        </div>

      </div>

      {/* RIGHT PREVIEW */}
      <div className="border border-black rounded-lg p-5 bg-white">

        <div className="w-full h-72 border border-black rounded flex items-center justify-center mb-5 overflow-hidden">
          {previewImage ? (
            <img src={previewImage} className="w-full h-full object-cover" />
          ) : (
            <p className="text-gray-500 text-sm">No cover photo selected</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center justify-center gap-2"
        >
          <Eye size={16} /> Publish Hotel
        </button>

      </div>
    </div>
  );
}
