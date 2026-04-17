import { API_BASE } from '../../../../../config/api';
import React, { useEffect, useState } from "react";
import EventCard from "./AllEvent/EventCard";
import EditEventModal from "./AllEvent/EditEventModal";
import ARVRModal from "./AllEvent/ARVRModal"; // ⭐ NEW

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);

  // ⭐ ARVR MODAL STATE
  const [arvrLink, setArvrLink] = useState("");
  const [isARVROpen, setARVROpen] = useState(false);

  // FETCH ALL EVENTS
  const fetchEvents = async () => {
    const res = await fetch(`${API_BASE}/api/admin/events`);
    const data = await res.json();
    if (data.success) setEvents(data.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // DELETE EVENT
  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;

    const res = await fetch(`${API_BASE}/api/admin/events/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      alert("Event Deleted ✔");
      setEvents((e) => e.filter((ev) => ev._id !== id));
    }
  };

  //  UPDATE EVENT (PUT)
  const updateEvent = async (updated) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/admin/events/${editingData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Event Updated Successfully ✔");
        setEditOpen(false);
        fetchEvents(); // refresh UI
      } else {
        alert(data.message || "Update failed ❌");
      }
    } catch (err) {
      console.error("UPDATE EVENT ERROR:", err);
    }
  };

  // ⭐ OPEN ARVR VIEWER (MODAL)
  const openARVR = (link) => {
    setArvrLink(link);
    setARVROpen(true);
  };

  return (
    <div className="p-6 pl-0 space-y-6">
      <h1 className="text-3xl font-bold text-green-900">All Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <EventCard
            key={ev._id}
            data={ev}
            onEdit={() => {
              setEditingData(ev);
              setEditOpen(true);
            }}
            onDelete={() => deleteEvent(ev._id)}
            onARVR={() => openARVR(ev.arvrLink)} // ⭐ MODAL OPEN
          />
        ))}
      </div>

      {/* EDIT MODAL */}
      <EditEventModal
        isOpen={isEditOpen}
        data={editingData}
        onClose={() => setEditOpen(false)}
        onSave={updateEvent} // ⭐ Correct handler
      />

      {/* AR/VR MODAL */}
      <ARVRModal
        isOpen={isARVROpen}
        link={arvrLink}
        onClose={() => setARVROpen(false)}
      />
    </div>
  );
}
