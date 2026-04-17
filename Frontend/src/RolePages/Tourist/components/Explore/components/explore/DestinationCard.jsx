import { API_BASE } from '../../../../../../config/api';
import React from "react";
import { MapPin, Video, PlayCircle, Info } from "lucide-react";

export default function DestinationCard({ data, onARVR, onDetails }) {
  const rawImage =
    data.imageLinks && data.imageLinks.length > 0
      ? data.imageLinks[0]
      : "";

  const imageUrl =
    rawImage && rawImage.trim() !== ""
      ? rawImage.startsWith("http")
        ? rawImage
        : `${API_BASE}/${rawImage}`
      : "https://placehold.co/600x400?text=No+Image+Found";

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
      
      {/* IMAGE */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* BADGES */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-white/90 px-4 py-1.5 rounded-full text-xs font-bold shadow">
            {data.category}
          </div>

          {data.arvr === "yes" && (
            <div className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow">
              <Video className="w-3 h-3" />
              AR/VR
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{data.name}</h3>

          <div className="flex items-center text-sm mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            {data.location}
          </div>

          <p className="text-white/90 text-sm line-clamp-2 mb-4">
            {data.description?.substring(0, 100)}...
          </p>

          <div className="flex gap-3">
            {/* DETAILS BUTTON */}
            <button
              onClick={onDetails}
              className="flex-1 bg-white/90 text-gray-900 hover:bg-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow hover:scale-105 transition"
            >
              <Info className="w-4 h-4" />
              Details
            </button>

            {/* AR/VR BUTTON */}
            {data.arvr === "yes" && (
              <button
                onClick={onARVR}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow hover:scale-105 transition"
              >
                <PlayCircle className="w-4 h-4" />
                360°
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
