import { API_BASE } from '../../../../config/api';
import { useState } from "react";
import axios from "axios";

export default function CreatePackage() {
  const [form, setForm] = useState({
    packageName: "",
    location: "",
    duration: "",
    price: "",
    discount: "",
    images: "",
    description: "",
    highlights: "",
    itinerary: "",
    inclusions: "",
    exclusions: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      packageName: form.packageName,
      location: form.location,
      duration: form.duration,
      price: Number(form.price),
      discount: Number(form.discount),

      images: form.images.split(",").map((i) => i.trim()),
      description: form.description,
      highlights: form.highlights.split(",").map((i) => i.trim()),
      itinerary: form.itinerary.split("\n").map((line, index) => ({
        day: index + 1,
        title: `Day ${index + 1}`,
        description: line,
      })),
      inclusions: form.inclusions.split(",").map((i) => i.trim()),
      exclusions: form.exclusions.split(",").map((i) => i.trim()),
    };

    try {
      await axios.post(
        `${API_BASE}/api/admin/tour-packages/create`,
        body
      );
      alert("Package Created Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create package");
    }
  };

  return (
    <div className="p-6 pl-[260px] max-w-[900px]">
      <h2 className="text-2xl font-semibold mb-6">Create Tour Package</h2>

      <form className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md" onSubmit={handleSubmit}>
        
        {/* Simple Inputs */}
        {[
          { type: "text", name: "packageName", placeholder: "Package Name" },
          { type: "text", name: "location", placeholder: "Location" },
          { type: "text", name: "duration", placeholder: "Duration (e.g. 4 Days / 3 Nights)" },
          { type: "number", name: "price", placeholder: "Price" },
          { type: "number", name: "discount", placeholder: "Discount (%)" },
        ].map((input, i) => (
          <input
            key={i}
            {...input}
            required={input.name !== "discount"}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg text-[15px] focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}

        {/* Textareas */}
        {[
          { name: "images", placeholder: "Image URLs (comma separated)" },
          { name: "description", placeholder: "Description" },
          { name: "highlights", placeholder: "Highlights (comma separated)" },
          { name: "itinerary", placeholder: "Itinerary (each day in new line)" },
          { name: "inclusions", placeholder: "Inclusions (comma separated)" },
          { name: "exclusions", placeholder: "Exclusions (comma separated)" },
        ].map((area, i) => (
          <textarea
            key={i}
            name={area.name}
            placeholder={area.placeholder}
            onChange={handleChange}
            className="p-3 min-h-[90px] border border-gray-300 rounded-lg text-[15px] focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Create Package
        </button>
      </form>
    </div>
  );
}
