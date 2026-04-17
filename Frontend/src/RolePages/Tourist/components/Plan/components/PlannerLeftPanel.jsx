import React from "react";
import {
  MapPin,
  Calendar,
  IndianRupee,
  Users,
  Plane,
  Utensils,
  Footprints,
  Camera,
  SlidersHorizontal,
  Clock,
  Loader2,
} from "lucide-react";

export default function PlannerLeftPanel({
  destination,
  startLocation,
  days,
  budget,
  startDate,
  endDate,
  travellerType,
  ageGroup,
  transportMode,
  foodPreference,
  comfortLevel,
  walkingPreference,
  photography,
  interests,

  setDestination,
  setStartLocation,
  setDays,
  setBudget,
  setStartDate,
  setEndDate,
  setTravellerType,
  setAgeGroup,
  setTransportMode,
  setFoodPreference,
  setComfortLevel,
  setWalkingPreference,
  setPhotography,
  setInterests,

  interestsList,
  generate,
  loading,
  error,
}) {
  const inputBox = "flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-emerald-500 transition-all";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border space-y-6">

      <h2 className="text-xl font-semibold text-gray-800">Trip Configuration</h2>
      <p className="text-xs text-gray-500">Fill details to generate a personalized AI itinerary.</p>

      {/* DESTINATION + START */}
      <div className="space-y-3">

        {/* Destination */}
        <div>
          <label className="text-[11px] font-semibold text-gray-600 tracking-wide uppercase">Destination in Jharkhand</label>
          <div className={inputBox}>
            <MapPin size={16} className="text-emerald-600" />
            <input
              className="flex-1 bg-transparent text-sm outline-none"
              placeholder="e.g. Ranchi, Netarhat, Deoghar, Betla..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          {/* Quick Pick Buttons */}
          <div className="flex gap-2 flex-wrap mt-2">
            {["Ranchi", "Netarhat", "Deoghar", "Betla NP", "Jamshedpur", "Hazaribagh", "Giridih", "Rajrappa"].map((place) => (
              <button
                key={place}
                onClick={() => setDestination(place)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                  destination === place
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                {place}
              </button>
            ))}
          </div>
        </div>

        {/* Start Location */}
        <div>
          <label className="text-[11px] font-semibold text-gray-600 tracking-wide uppercase">Starting From</label>
          <div className={inputBox}>
            <MapPin size={16} className="text-emerald-600" />
            <input
              className="flex-1 bg-transparent text-sm outline-none"
              placeholder="Ranchi / Jamshedpur / Dhanbad..."
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* DATES */}
      <div className="grid grid-cols-3 gap-4">

        {/* Start Date */}
        <div>
          <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Start Date</label>
          <div className={inputBox}>
            <Calendar size={16} className="text-emerald-600" />
            <input
              type="date"
              className="flex-1 bg-transparent outline-none text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        {/* End Date */}
        <div>
          <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">End Date</label>
          <div className={inputBox}>
            <Calendar size={16} className="text-emerald-600" />
            <input
              type="date"
              className="flex-1 bg-transparent outline-none text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Days */}
        <div>
          <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Days</label>
          <div className={inputBox}>
            <Clock size={16} className="text-emerald-600" />
            <input
              type="number"
              min={1}
              className="flex-1 bg-transparent outline-none text-sm"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* BUDGET */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Budget (₹)</label>
        <div className={inputBox}>
          <IndianRupee size={16} className="text-emerald-600" />
          <input
            type="number"
            className="flex-1 bg-transparent outline-none text-sm"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
      </div>

      {/* TRAVELLER TYPE */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Traveller Type</label>
        <div className="flex gap-2 flex-wrap mt-1 text-xs">
          {["Solo", "Friends", "Family", "Couple"].map((t) => (
            <button
              key={t}
              onClick={() => setTravellerType(t)}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                travellerType === t
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <Users size={12} className="inline mr-1" /> {t}
            </button>
          ))}
        </div>
      </div>

      {/* AGE GROUP */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Age Group</label>
        <div className="flex gap-2 flex-wrap mt-1 text-xs">
          {["18-30", "30-45", "45-60", "60+"].map((age) => (
            <button
              key={age}
              onClick={() => setAgeGroup(age)}
              className={`px-3 py-1.5 rounded-full border transition ${
                ageGroup === age
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSPORT */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Preferred Transport</label>
        <div className="flex gap-2 flex-wrap mt-1 text-xs">
          {["Car", "Bike", "Train", "Public Transport", "Cab"].map((mode) => (
            <button
              key={mode}
              onClick={() => setTransportMode(mode)}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1 transition ${
                transportMode === mode
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Plane size={12} /> {mode}
            </button>
          ))}
        </div>
      </div>

      {/* FOOD */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Food Preference</label>
        <div className="flex gap-2 flex-wrap mt-1 text-xs">
          {["Veg", "Non-veg", "Local + Street Food", "Mixed"].map((f) => (
            <button
              key={f}
              onClick={() => setFoodPreference(f)}
              className={`px-3 py-1.5 rounded-full border flex items-center gap-1 transition ${
                foodPreference === f
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Utensils size={12} /> {f}
            </button>
          ))}
        </div>
      </div>

      {/* COMFORT */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Comfort Level</label>
        <div className="flex gap-2 flex-wrap mt-1 text-xs">
          {["Budget", "Standard", "Premium"].map((c) => (
            <button
              key={c}
              onClick={() => setComfortLevel(c)}
              className={`px-3 py-1.5 rounded-full border transition ${
                comfortLevel === c
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <SlidersHorizontal size={12} /> {c}
            </button>
          ))}
        </div>
      </div>

      {/* WALKING */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Walking Preference</label>
        <div className="flex gap-2 flex-wrap mt-1 text-xs">
          {["Low", "Medium", "High"].map((w) => (
            <button
              key={w}
              onClick={() => setWalkingPreference(w)}
              className={`px-3 py-1.5 rounded-full border transition ${
                walkingPreference === w
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Footprints size={12} /> {w}
            </button>
          ))}
        </div>
      </div>

      {/* PHOTOGRAPHY */}
      <div>
        <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Photography Focus</label>
        <button
          onClick={() => setPhotography(!photography)}
          className={`mt-1 px-3 py-2 rounded-full border w-full flex justify-center items-center gap-2 text-xs transition ${
            photography
              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <Camera size={14} /> {photography ? "High Priority" : "Normal"}
        </button>
      </div>

      {/* INTERESTS */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">Interests</label>
        <div className="flex gap-2 flex-wrap mt-2 text-xs">
          {interestsList.map((label) => (
            <button
              key={label}
              onClick={() =>
                setInterests((prev) =>
                  prev.includes(label)
                    ? prev.filter((x) => x !== label)
                    : [...prev, label]
                )
              }
              className={`px-3 py-1.5 rounded-full border transition ${
                interests.includes(label)
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* GENERATE BUTTON */}
      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-emerald-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md"
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        {loading ? "Generating..." : "Generate AI Itinerary"}
      </button>

    </div>
  );
}
