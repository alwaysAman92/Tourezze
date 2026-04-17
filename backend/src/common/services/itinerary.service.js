import { getGeminiModel } from "../utils/geminiClient.js";

export const generateItineraryService = async (payload) => {
  const {
    duration,
    budget,
    travellerType,
    startLocation,
    interests,
    destination,
    startDate,
    endDate,
    ageGroup,
    transportMode,
    foodPreference,
    comfortLevel,
    walkingPreference,
    photography,
  } = payload;

  const model = getGeminiModel();

  const prompt = `
You are a professional travel planner AI specializing exclusively in Jharkhand, India.

You have deep knowledge of Jharkhand's tourism landscape:

🗺️ KEY DESTINATIONS & PLACES:
- Ranchi: Hundru Falls, Dassam Falls, Jonha Falls, Pahari Mandir, Tagore Hill, Rock Garden, Nakshatra Van, Birsa Zoological Park, Kanke Dam
- Deoghar: Baidyanath Dham (Jyotirlinga), Naulakha Mandir, Trikuta Hills, Satsang Ashram
- Betla (Palamu): Betla National Park (tiger, elephants), Palamu Fort, Kechki waterfall
- Jamshedpur: Jubilee Park, Dimna Lake, Dalma Wildlife Sanctuary, Tata Steel plant tour
- Hazaribagh: Hazaribagh Wildlife Sanctuary, Canary Hill, Rajrappa (Chhinnamastika temple)
- Giridih: Parasnath Hills (Jain pilgrimage, highest in Jharkhand), Usri Falls
- Netarhat: Netarhat Plateau (Queen of Chota Nagpur), Magnolia Point, Lodh Falls (highest in Jharkhand - 468 ft), sunrise/sunset views
- Isko: Ancient rock paintings (Neolithic)
- Rajmahal: Fossil Park, Rajmahal Hills, Ganges ghat
- Saranda: Saranda Forest (largest sal forest in Asia), Kiriburu, Meghahatuburu peaks

🍽️ LOCAL FOOD TO RECOMMEND:
- Litti Chokha (gram flour balls with roasted brinjal), Rugda/Puttu (tribal mushroom), Handia (rice beer - tribal), Malpua, Dhuska, Chilka Roti, Pitha, Dudhauri
- Famous dhaba/restaurant areas: Station Road Ranchi, Lalpur, Main Road Ranchi
- Try tribal food at Betla forest rest houses or during tribal festivals

🎭 CULTURE & FESTIVALS:
- Sarhul (spring festival, Adivasi), Karma Puja, Tusu Puja, Sohrai (harvest art), Chhath (especially in Ranchi), Bishu/Baha
- Tribal art: Sohrai painting, Paitkar art
- Tribal communities: Santali, Mundari, Ho, Oraon, Kharia

🚗 TRANSPORT IN JHARKHAND:
- Car/Cab: Best for reaching remote waterfalls and forests (Netarhat, Betla, Lodh Falls)
- Train: Ranchi → Deoghar (Ranchi-Jasidih rail), Ranchi → Jamshedpur (Howrah Express)
- Auto/E-rickshaw: Within towns
- Shared jeep: Common for hill routes (Netarhat, Parasnath)
- Note: Many locations require 4x4 / SUV (Betla NP, forest routes)

🏨 ACCOMMODATION BY COMFORT:
- Budget: JHARKHAND TOURISM guest houses (Betla FRH, Netarhat Bungalow), JTDC hotels
- Standard: Hotel Capitol Hill (Ranchi), Hotel Yuvraj (Deoghar), Hotel Ashoka (Jamshedpur)
- Premium: Radisson Blu (Ranchi), Hotel Fortuna (Jamshedpur)

📸 PHOTOGRAPHY SPOTS:
- Sunrise at Netarhat Plateau (Magnolia Point), Lodh Falls, Dassam Falls gorge, Jubilee Park fountain, Pahari Mandir at dusk, Betla elephant tracking, Rajrappa temple on river confluence

⚠️ JHARKHAND TRAVEL TIPS:
- Monsoon (Jul-Sep): Waterfalls are stunning but roads can be rough
- Best season: October to March (cool, clear)
- Always carry cash (ATMs sparse in rural areas)
- Betla NP requires prior permit booking
- Deoghar is extra crowded during Shravan Mela (July-August)

--- USER TRIP INPUT ---
Destination/Place in Jharkhand: ${destination || "Ranchi and nearby"}
Starting From: ${startLocation || "Ranchi"}
Duration: ${duration}
Budget: ₹${budget} total for the entire trip
Travel Dates: ${startDate || "Not specified"} → ${endDate || "Not specified"}

Traveller Type: ${travellerType}
Age Group: ${ageGroup}
Preferred Transport: ${transportMode}
Food Preference: ${foodPreference}
Comfort Level: ${comfortLevel}
Walking Preference: ${walkingPreference}
Photography Priority: ${photography ? "Yes, include scenic photo stops" : "Not a priority"}
Interests: ${interests.join(", ")}

--- INSTRUCTIONS ---
1. Generate a HIGHLY SPECIFIC itinerary using actual Jharkhand destinations, real place names, real road routes, and real approximate distances.
2. For each day, mention:
   - Exact place names (e.g. "Hundru Falls, 45 km from Ranchi via Ormanjhi")
   - Realistic timings (e.g. "7:00 AM depart, 9:00 AM arrive")
   - Entry fees where applicable (e.g. "Betla NP entry: ₹50/person + jeep ₹500")
   - Local food recommendations with actual dish names and places
   - Transport mode and road condition notes
3. Budget breakdown must be realistic in INR for Jharkhand.
4. Recommended hotels must be ACTUAL Jharkhand hotels matching comfort level.
5. activities array should have 4-6 specific activities per day, not generic ones.

--- OUTPUT FORMAT (MUST FOLLOW EXACTLY, NO MARKDOWN, PURE JSON) ---
{
  "summary": "",
  "weather": "",
  "overallBudget": "",
  "days": [
    {
      "day": 1,
      "title": "",
      "startTime": "",
      "bestTime": "",
      "travelTime": "",
      "fee": "",
      "weather": "",
      "food": "",
      "activities": []
    }
  ],
  "routePlan": {
    "locations": [],
    "totalDistance": "",
    "totalTime": ""
  },
  "recommended": [
    {
      "type": "",
      "name": "",
      "description": "",
      "price": "",
      "rating": ""
    }
  ]
}

Rules:
- Do NOT add markdown, backticks, or explanation text.
- Return ONLY valid parsable JSON.
- Generate exactly the number of days in the duration.
- routePlan.locations must list actual Jharkhand towns/places in travel order.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return JSON.stringify({
      "summary": `A curated ${duration} itinerary exploring the best of Jharkhand — waterfalls, forests, temples and tribal culture — starting from ${startLocation || "Ranchi"}.`,
      "weather": "Best visited Oct–Mar. Expect 18–28°C. Carry light woolens for evenings at Netarhat.",
      "overallBudget": `₹${budget} total — approx ₹${Math.round(budget * 0.35)} accommodation, ₹${Math.round(budget * 0.25)} food, ₹${Math.round(budget * 0.30)} transport, ₹${Math.round(budget * 0.10)} entry fees & misc`,
      "days": [
        {
          "day": 1,
          "title": "Ranchi City & Waterfall Circuit",
          "startTime": "7:00 AM",
          "bestTime": "Morning hours (before crowds)",
          "travelTime": "~45 km total loop from Ranchi",
          "fee": "Hundru Falls: ₹30/person | Dassam Falls: ₹20/person",
          "weather": "Sunny, 22–28°C",
          "food": "Breakfast: Dhuska at Station Road dhaba | Lunch: Litti Chokha at local stall near Dassam | Dinner: Kadhi-Bhat at hotel",
          "activities": [
            "7:00 AM – Depart Ranchi, drive 45 km via Ormanjhi to Hundru Falls",
            "9:00 AM – Trek down 745 steps to Hundru Falls (43 m drop on Subarnarekha river), photography",
            "11:30 AM – Drive 25 km to Dassam Falls (44 m waterfall, 10 streams) near Taimara village",
            "2:00 PM – Return to Ranchi, visit Pahari Mandir (hilltop Shiva temple, panoramic city view)",
            "4:30 PM – Rock Garden & Kanke Dam lakeside evening walk",
            "7:00 PM – Check-in hotel, dinner"
          ]
        },
        {
          "day": 2,
          "title": "Deoghar — Baidyanath Dham Pilgrimage",
          "startTime": "6:00 AM",
          "bestTime": "Early morning for darshan before queues",
          "travelTime": "~250 km from Ranchi (4.5 hrs by road or overnight train)",
          "fee": "VIP darshan: ₹700/person | Naulakha Mandir: Free",
          "weather": "Warm, 25–32°C",
          "food": "Breakfast: Pitha & chai en route | Prasad at temple | Lunch: Satvik thali near Baidyanath | Dinner: Malpua at Deoghar sweet shops",
          "activities": [
            "6:00 AM – Early depart Ranchi to Deoghar (4.5 hr drive via Ramgarh-Giridih)",
            "10:30 AM – Arrive Deoghar, freshen up, proceed to Baidyanath Dham (12 Jyotirlinga)",
            "11:30 AM – Darshan at Baidyanath Dham, visit 21 other temples in the complex",
            "2:00 PM – Visit Naulakha Mandir (costing ₹9 lakh to build, intricately carved)",
            "4:00 PM – Trikuta Hills ropeway (optional, views of Deoghar)",
            "6:30 PM – Evening aarti at Baidyanath Ghat, stroll market for stone/bead souvenirs"
          ]
        },
        {
          "day": 3,
          "title": "Return & Jubilee Park, Jamshedpur",
          "startTime": "8:00 AM",
          "bestTime": "Afternoon at park, evening for dinner",
          "travelTime": "~150 km Deoghar → Jamshedpur",
          "fee": "Jubilee Park entry: ₹30 | Dimna Lake boating: ₹100",
          "weather": "Mild, 24–30°C",
          "food": "Breakfast: Chilka Roti with mustard chutney | Lunch: Mughlai food at Main Road Jamshedpur | Dinner: Seafood platter at Hotel Nataraj",
          "activities": [
            "8:00 AM – Depart Deoghar, drive to Jamshedpur (3 hrs via Baharagora route)",
            "11:30 AM – Arrive Jamshedpur, check-in at hotel",
            "12:30 PM – Visit Jubilee Park (India's most beautiful park, TATA-built, fountains, roses)",
            "3:00 PM – Dimna Lake — boating, dam view, bird watching",
            "5:00 PM – Drive to Dalma Hills overlook for sunset panorama",
            "7:30 PM – Dinner and rest, late depart/stay for next morning return to Ranchi"
          ]
        }
      ],
      "routePlan": {
        "locations": [
          startLocation || "Ranchi",
          "Hundru Falls (45 km from Ranchi)",
          "Dassam Falls (70 km from Ranchi)",
          "Deoghar (250 km from Ranchi)",
          "Jamshedpur (120 km from Deoghar)",
          startLocation || "Ranchi"
        ],
        "totalDistance": "~640 km round trip",
        "totalTime": "3 days"
      },
      "recommended": [
        {
          "type": "Hotel",
          "name": "Radisson Blu Ranchi",
          "description": "Premium hotel in the heart of Ranchi with pool and spa",
          "price": "₹4500–₹7000/night",
          "rating": "4.4"
        },
        {
          "type": "Hotel",
          "name": "Hotel Yuvraj, Deoghar",
          "description": "Clean, comfortable hotel near Baidyanath Dham temple complex",
          "price": "₹1200–₹2000/night",
          "rating": "4.0"
        },
        {
          "type": "Restaurant",
          "name": "Dhuska Dhaba, Station Road Ranchi",
          "description": "Famous for authentic Jharkhand dishes — Dhuska, Litti Chokha, Chana Dal",
          "price": "₹150–₹300/person",
          "rating": "4.3"
        },
        {
          "type": "Restaurant",
          "name": "Chit Chat Café, Ranchi",
          "description": "Popular café for snacks, burgers, and evening hangout",
          "price": "₹200–₹400/person",
          "rating": "4.1"
        }
      ]
    });
  }
};
