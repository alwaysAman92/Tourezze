import { useState, useEffect } from "react";
import { API_BASE } from "../../../../../config/api";
import useHotelFilters from "../hooks/useHotelFilters";
import sampleHotels from "../data/hotels";

import HotelsSearchBar from "../components/hotels/HotelsSearchBar";
import HotelsFiltersSidebar from "../components/hotels/HotelsFiltersSidebar";
import HotelGrid from "../components/hotels/HotelGrid";
import SortDropdown from "../components/hotels/SortDropdown";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hotel/all`);
        const data = await res.json();
        if (data.success && data.hotels.length > 0) {
          // Transform backend data to match frontend expectations
          const transformedHotels = data.hotels.map(hotel => ({
            id: hotel._id,
            name: hotel.hotelName,
            location: `${hotel.city}, ${hotel.state}`,
            pricePerNight: hotel.pricePerNight || 2000, // Default if not set
            rating: hotel.starRating || 4.5,
            propertyType: hotel.category || "Hotel",
            amenities: hotel.tags || [],
            image: hotel.coverPhoto || hotel.imageLinks?.[0],
            priceLine: `₹${hotel.pricePerNight || 2000} per night`
          }));
          setHotels(transformedHotels);
        } else {
          // Use sample data as fallback, transform to expected format
          const transformedSample = sampleHotels.map(hotel => ({
            ...hotel,
            priceLine: `₹${hotel.pricePerNight} per night`
          }));
          setHotels(transformedSample);
        }
      } catch (err) {
        console.error("Failed to load hotels from API, using sample data:", err);
        // Use sample data as fallback on API error
        const transformedSample = sampleHotels.map(hotel => ({
          ...hotel,
          priceLine: `₹${hotel.pricePerNight} per night`
        }));
        setHotels(transformedSample);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const {
    filtered,
    location,
    setLocation,
    price,
    setPrice,
    propertyType,
    setPropertyType,
    amenity,
    setAmenity,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
  } = useHotelFilters(hotels);

  return (
    <div className="bg-[#faf5ef] min-h-screen pb-16 relative">
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Loading hotels...</div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      )}
      {!loading && !error && (
        <>
          {/* Search Bar */}
          <HotelsSearchBar
            location={location}
            setLocation={setLocation}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
          />

          <div className="max-w-7xl mx-auto px-4 mt-6">
            {/* Result Count + Sort + Show/Hide Filters button (top-right) */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{filtered.length} properties found</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters((s) => !s)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl shadow font-semibold"
                  aria-expanded={showFilters}
                  aria-controls="filters-sidebar"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>

            {/* Main area (sidebar is overlayed) */}
            <div className="relative mt-4">
              {/* Sidebar (overlay) */}
              <HotelsFiltersSidebar
                price={price}
                setPrice={setPrice}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                amenity={amenity}
                setAmenity={setAmenity}
                minRating={minRating}
                setMinRating={setMinRating}
                show={showFilters}
                onClose={() => setShowFilters(false)}
              />

              {/* Hotels grid - pass showFilters so grid can change columns */}
              <div className="transition-all">
                <HotelGrid hotels={filtered} filterOpen={showFilters} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
