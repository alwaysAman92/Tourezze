import { API_BASE } from '../../../../../config/api';
import React, { useState } from "react";
import {
  Loader2,
} from "lucide-react";

import PlannerHeader from "./PlannerHeader";
import PlannerLeftPanel from "./PlannerLeftPanel";
import PlannerRightPanel from "./PlannerRightPanel";



export default function AiItineraryPro() {
  // BASIC TRIP INFO (shared states)
  const [destination, setDestination] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(15000);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // USER PROFILE
  const [travellerType, setTravellerType] = useState("Friends");
  const [ageGroup, setAgeGroup] = useState("18-30");
  const [transportMode, setTransportMode] = useState("Car");
  const [foodPreference, setFoodPreference] = useState("Local + Street Food");
  const [comfortLevel, setComfortLevel] = useState("Standard");
  const [walkingPreference, setWalkingPreference] = useState("Medium");
  const [photography, setPhotography] = useState(true);

  const [interests, setInterests] = useState(["Nature", "Scenic Views"]);

  // API STATES
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const cleanJSON = (text) => text?.replace(/```json|```/g, "").trim();

  const generate = async () => {
    setLoading(true);
    setError("");
    setSaved(false);
    setResult(null);

    try {
      const body = {
        duration: days + " Days",
        budget,
        travellerType,
        startLocation: startLocation || destination || "Ranchi",
        interests,
        preferences: {
          destination,
          startDate,
          endDate,
          ageGroup,
          transportMode,
          foodPreference,
          comfortLevel,
          walkingPreference,
          photography,
        },
      };

      const res = await fetch(`${API_BASE}/api/ai/generate-itinerary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      let plan = typeof data.itinerary === "string"
        ? JSON.parse(cleanJSON(data.itinerary))
        : data.itinerary;

      setPlanId(data.planId);
      setResult(plan);
    } catch (err) {
      setError("Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!planId) return;

    try {
      const res = await fetch(`${API_BASE}/api/ai/save-plan/${planId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) setSaved(true);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <PlannerHeader
          saved={saved}
          handleSavePlan={handleSavePlan}
          disabledSave={!planId}
          hasResult={!!result}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,2fr] gap-6">

          {/* LEFT PANEL */}
          <PlannerLeftPanel
            {...{
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
            }}
            setDestination={setDestination}
            setStartLocation={setStartLocation}
            setDays={setDays}
            setBudget={setBudget}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setTravellerType={setTravellerType}
            setAgeGroup={setAgeGroup}
            setTransportMode={setTransportMode}
            setFoodPreference={setFoodPreference}
            setComfortLevel={setComfortLevel}
            setWalkingPreference={setWalkingPreference}
            setPhotography={setPhotography}
            setInterests={setInterests}
            interestsList={[
              "Nature","Scenic Views","Waterfalls","Wildlife","Culture",
              "Heritage","Religious","Adventure","Shopping","Food & Cafes","Nightlife",
            ]}
            generate={generate}
            loading={loading}
            error={error}
          />

          {/* RIGHT PANEL */}
          <PlannerRightPanel
            result={result}
            loading={loading}
          />

        </div>
      </div>
    </div>
  );
}
