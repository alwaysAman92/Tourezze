import { API_BASE } from '../../../../../config/api';
import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Tag,
  User,
  FileText,
  FileUp,
  Image,
  Plus,
  Video,
} from "lucide-react";

export default function CreateEventForm() {
  const [form, setForm] = useState({
    eventName: "",
    organizer: "",
    location: "",
    eventDate: "",
    description: "",
    category: "",
    tags: "",
    bannerImage: "",
    documentLink: "",
    arvr: "",
    arvrLink: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ POST request to backend
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        tags:
          form.tags.trim() !== ""
            ? form.tags.split(",").map((t) => t.trim())
            : [],
      };

      const res = await fetch(`${API_BASE}/api/admin/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Event Created Successfully ✔");
        console.log("EVENT SAVED:", data);

        // Reset Form
        setForm({
          eventName: "",
          organizer: "",
          location: "",
          eventDate: "",
          description: "",
          category: "",
          tags: "",
          bannerImage: "",
          documentLink: "",
          arvr: "",
          arvrLink: "",
        });
      } else {
        alert("Event creation failed ❌");
      }
    } catch (err) {
      console.error("Event Create Error:", err);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="p-6 pl-0 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Create New Event</h1>

      <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Event Name */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <FileText size={16} /> Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* Organizer */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <User size={16} /> Organizer
            </label>
            <input
              type="text"
              name="organizer"
              value={form.organizer}
              onChange={handleChange}
              placeholder="Organizer name"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
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
              placeholder="Venue / place name"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <Calendar size={16} /> Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium text-sm flex items-center gap-1">
              <Tag size={16} /> Event Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            >
              <option>Select Category</option>
              <option>Cultural Program</option>
              <option>Sports Event</option>
              <option>Festival</option>
              <option>Government Meeting</option>
              <option>Training / Workshop</option>
              <option>Tourism & Travel</option>
            </select>
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
              placeholder="Eg: Music, Outdoor, Free Entry"
              className="w-full border mt-1 px-3 py-2 rounded-lg"
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-sm">Event Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write event details..."
            className="w-full border mt-1 px-3 py-2 rounded-lg"
          ></textarea>
        </div>

        {/* Banner Image */}
        <div>
          <label className="font-medium text-sm flex items-center gap-1">
            <Image size={16} /> Banner Image URL
          </label>
          <input
            type="text"
            name="bannerImage"
            value={form.bannerImage}
            onChange={handleChange}
            placeholder="https://image-link.jpg"
            className="w-full border mt-1 px-3 py-2 rounded-lg"
          />
        </div>

        {/* AR/VR AVAILABLE? */}
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
            <option value="">Select</option>
            <option value="yes">Yes (360° View Available)</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* ARVR LINK */}
        {form.arvr === "yes" && (
          <div>
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

        {/* Document Link */}
        <div>
          <label className="font-medium text-sm flex items-center gap-1">
            <FileUp size={16} /> Document Link
          </label>
          <input
            type="text"
            name="documentLink"
            value={form.documentLink}
            onChange={handleChange}
            placeholder="https://docs-link.pdf"
            className="w-full border mt-1 px-3 py-2 rounded-lg"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg flex items-center gap-1 hover:bg-green-800"
          >
            <Plus size={20} /> Create Event
          </button>
        </div>

      </div>
    </div>
  );
}
