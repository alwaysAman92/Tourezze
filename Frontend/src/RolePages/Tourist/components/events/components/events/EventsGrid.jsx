import { API_BASE } from '../../../../../../config/api';
import EventCard from "./EventCard";

export default function EventsGrid({ events }) {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {events.map((ev) => (
    <EventCard
      key={ev._id}
      event={{
        name: ev.eventName,
        image: ev.bannerImage
          ? `${API_BASE}/image-proxy?url=${encodeURIComponent(ev.bannerImage)}`
          : "https://via.placeholder.com/400",
        dates: ev.eventDate,
        district: ev.location,
        category: ev.category,
        price: ev.price ? `₹${ev.price}` : "₹399",
        rating: ev.rating || 4.5,
        description: ev.description,
        duration: ev.duration || "N/A",
        attendees: ev.attendees || "0",
        featured: ev.featured === "yes",
        view360: ev.view360,   // ⭐ 360° LINK PASSED HERE
      }}
    />
  ))}
</div>

  );
}
