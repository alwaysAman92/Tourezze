import React from "react";

export default function CategoryTabs({ active, setActive, search, setSearch }) {
  const categories = ["All", "Nature", "Temple", "Adventure", "Heritage"];

  return (
    <div id="explore-section" className="px-6 mt-6 space-y-4">
      <input
        type="text"
        placeholder="Search destinations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border 
              ${
                active === cat
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
