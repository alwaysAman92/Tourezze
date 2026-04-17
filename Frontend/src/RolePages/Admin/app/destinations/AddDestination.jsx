import { API_BASE } from '../../../../config/api';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mountain,
  Calendar,
  Tag,
  Compass,
  Plus,
  Video,
  Image,
} from "lucide-react";

export default function AddDestination() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    mapUrl: "",
    bestSeason: "",
    arvr: "",
    arvrLink: "",
    description: "",
    nearby: "",
    tags: "",
    imageLinks: "", // ⭐ Google Drive image URLs
  });

  // Handle Inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert("Destination Added Successfully ✔");
      console.log(data);

    } catch (err) {
      console.error(err);
      alert("Error adding destination ❌");
    }
  };

  return (
    <div className="p-6 pl-32 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Add New Destination</h1>

      <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="font-medium text-sm">Destination Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter destination name"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <Mountain size={16} /> Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            >
              <option>Select Category</option>
              <option>Hill Station</option>
              <option>Waterfall</option>
              <option>Eco-Tourism</option>
              <option>Heritage & History</option>
              <option>Wildlife Sanctuary</option>
              <option>Temple / Pilgrimage</option>
              <option>Adventure Activity</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <MapPin size={16} /> Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Eg: Netarhat, Latehar"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* Map URL */}
          <div>
            <label className="font-medium text-sm">Google Maps URL</label>
            <input
              type="text"
              name="mapUrl"
              value={form.mapUrl}
              onChange={handleChange}
              placeholder="https://maps.google.com/location"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* Best Season */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <Calendar size={16} /> Best Time to Visit
            </label>
            <input
              type="text"
              name="bestSeason"
              value={form.bestSeason}
              onChange={handleChange}
              placeholder="Eg: October – March"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* AR/VR Select */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <Video size={16} /> AR/VR Preview Available?
            </label>
            <select
              name="arvr"
              value={form.arvr}
              onChange={handleChange}
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            >
              <option>Select Option</option>
              <option value="yes">Yes (360° View Available)</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* ARVR Link */}
          {form.arvr === "yes" && (
            <div className="col-span-2">
              <label className="font-medium text-sm">360° AR/VR Link</label>
              <input
                type="text"
                name="arvrLink"
                value={form.arvrLink}
                onChange={handleChange}
                placeholder="https://your-360-view-link.com"
                className="w-full border mt-1 px-3 py-2 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-sm">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write description..."
            className="w-full border mt-1 px-3 py-2 rounded-lg"
          ></textarea>
        </div>

        {/* Nearby */}
        <div>
          <label className="font-medium text-sm flex items-center gap-1">
            <Compass size={16} /> Nearby Attractions
          </label>
          <input
            type="text"
            name="nearby"
            value={form.nearby}
            onChange={handleChange}
            placeholder="Eg: Magnolia Point, Pine Forest"
            className="w-full border mt-1 px-3 py-2 rounded-lg"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="font-medium text-sm flex items-center gap-1">
            <Tag size={16} /> Tags
          </label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Eg: Eco-Friendly, Trekking"
            className="w-full border mt-1 px-3 py-2 rounded-lg"
          />
        </div>

        {/* ⭐ IMAGE LINKS (Direct Image URLs) */}
<div>
  <label className="font-medium text-sm flex items-center gap-1">
    <Image size={18} /> Image Links
  </label>

  <input
    type="text"
    name="imageLinks"
    value={form.imageLinks}
    onChange={handleChange}
    placeholder="Paste direct image URLs separated by comma"
    className="w-full border mt-1 px-3 py-2 rounded-lg"
  />

  <p className="text-xs mt-1 text-gray-500">
    Example: https://example.com/img1.jpg, https://example.com/img2.png
  </p>
</div>


        {/* Submit */}
        <div className="flex justify-end">

           {/* ⭐ All Destinations Button */}
          <Link
            to="/role/government/destinations"
            className="px-6 py-3 rounded-lg border border-green-700 text-green-700 font-medium hover:bg-green-50 transition"
          >
            ← All Destinations
          </Link>

          <button
            className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg flex items-center gap-1"
            onClick={handleSubmit}
          >
            <Plus size={20} /> Add Destination
          </button>
        </div>

      </div>
    </div>
  );
}
