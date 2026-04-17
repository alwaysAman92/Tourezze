import React from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";

export default function SearchFilterBar({ search, setSearch, filter, setFilter }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-4">

        {/* Search Bar */}
        <div className="flex items-center bg-white border rounded-xl px-4 py-2 shadow-sm w-full sm:w-72">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-1 ml-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          className="border bg-white rounded-xl px-4 py-2 shadow-sm outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Hill Station</option>
          <option>Waterfall</option>
          <option>Wildlife Sanctuary</option>
          <option>Pilgrimage</option>
          <option>Heritage & Culture</option>
        </select>
      </div>

      {/* ⭐ Add Destination Button */}
      <Link
        to="/role/government/add-destination"
        className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-green-800 transition"
      >
        <Plus size={18} /> Add Destination
      </Link>
    </div>
  );
}
