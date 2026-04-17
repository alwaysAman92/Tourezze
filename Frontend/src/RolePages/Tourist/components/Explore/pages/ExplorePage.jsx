import { API_BASE } from '../../../../../config/api';
import React, { useEffect, useState } from "react";
import Hero from "../components/explore/Hero";
import CategoryTabs from "../components/explore/CategoryTabs";
import DestinationGrid from "../components/explore/DestinationGrid";

export default function ExplorePage() {
  const [destinations, setDestinations] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // FETCH DESTINATIONS FROM API
  const fetchDestinations = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/destinations`);
      const data = await res.json();
      if (data.success) setDestinations(data.data);
    } catch (err) {
      console.log("Error fetching destinations:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // FILTER LOGIC
  const filtered = destinations.filter(
    (d) =>
      (category === "All" || d.category === category) &&
      d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Hero />

      <CategoryTabs
        active={category}
        setActive={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <DestinationGrid destinations={filtered} />
    </div>
  );
}
