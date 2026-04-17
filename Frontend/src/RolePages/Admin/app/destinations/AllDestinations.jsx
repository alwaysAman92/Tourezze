import { API_BASE } from '../../../../config/api';

import React, { useState, useEffect } from "react";
import SearchFilterBar from "./Allcomponents/SearchFilterBar";
import DestinationCard from "./Allcomponents/DestinationCard";
import EditModal from "./Allcomponents/EditModal";
import ARVRModal from "./Allcomponents/ARVRModal";

export default function AllDestinations() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [destinations, setDestinations] = useState([]);

  const [editingData, setEditingData] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);

  const [isARVROpen, setARVROpen] = useState(false);
  const [arvrLink, setArvrLink] = useState("");

  // FETCH ALL DESTINATIONS
  const fetchDestinations = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/destinations`);
      const data = await res.json();

      if (data.success) setDestinations(data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // UPDATE DESTINATION
  const updateDestination = async (form) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/admin/destinations/${editingData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Destination Updated Successfully ✔");
        setEditOpen(false);
        fetchDestinations();
      } else {
        alert(data.message || "Failed to update destination ❌");
      }
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  // DELETE DESTINATION
  const deleteDestination = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/destinations/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Destination Deleted Successfully ✔");
        setDestinations((prev) => prev.filter((d) => d._id !== id));
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // OPEN AR/VR MODAL
  const openARVR = (link) => {
    if (!link) return alert("No AR/VR link available.");
    setArvrLink(link);
    setARVROpen(true);
  };

  // FILTERED LIST
  const filtered = destinations.filter(
    (d) =>
      (filter === "All" || d.category === filter) &&
      d.name?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <div className="p-6 pl-32 space-y-6">
      <h1 className="text-3xl font-bold text-green-900">All Destinations</h1>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => (
          <DestinationCard
            key={d._id}
            data={d}
            onEdit={() => {
              setEditingData(d);
              setEditOpen(true);
            }}
            onDelete={() => deleteDestination(d._id)}
            onARVR={() => openARVR(d.arvrLink)}
          />
        ))}
      </div>

      {/* EDIT MODAL */}
      <EditModal
        isOpen={isEditOpen}
        data={editingData}
        onClose={() => setEditOpen(false)}
        onSave={updateDestination}
      />

      {/* ARVR MODAL */}
      <ARVRModal
        isOpen={isARVROpen}
        link={arvrLink}
        onClose={() => setARVROpen(false)}
      />
    </div>
  );
}
