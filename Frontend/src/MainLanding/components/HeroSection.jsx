import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/Photos/HeroImage/Waterfall.jpg",
    title: "Eco Tourism",
    desc: "Dense forests, national parks, and scenic green landscapes.",
  },
  {
    image: "/Photos/HeroImage/Adventure.jpg",
    title: "Adventure Tourism",
    desc: "Trekking, parasailing, boating, and rock climbing thrills.",
  },
  {
    image: "/Photos/HeroImage/Culture.jpg",
    title: "Cultural Tourism",
    desc: "Tribal dance, art, festivals, and deep-rooted traditions.",
  },
  {
    image: "/Photos/HeroImage/Religious.jpg",
    title: "Religious Tourism",
    desc: "Baba Baidyanath Dham, Parasnath, Rajrappa, and more holy sites.",
  },
  {
    image: "/Photos/HeroImage/Heritage.jpg",
    title: "Heritage Tourism",
    desc: "Ancient temples, forts, and historic architectural marvels.",
  },
  {
    image: "/Photos/HeroImage/Nature.jpg",
    title: "Wellness & Nature Tourism",
    desc: "Netarhat, Patratu Valley, and peaceful natural retreats.",
  },
  {
    image: "/Photos/HeroImage/Urban.png",
    title: "Urban Tourism",
    desc: "City attractions, parks, museums, and modern recreation.",
  },
  {
    image: "/Photos/HeroImage/Waterfalls.jpg",
    title: "Waterfall Tourism",
    desc: "Hundru, Dassam, Jonha, Hirni, and other majestic falls.",
  },
  {
    image: "/Photos/HeroImage/Tribal.jpg",
    title: "Rural & Tribal Tourism",
    desc: "Explore tribal villages, lifestyle, culture, and traditions.",
  },
  {
    image: "/Photos/HeroImage/Industrial.jpg",
    title: "Industrial & Mining Tourism",
    desc: "Coalfields, steel plants, and mineral-rich industrial sites.",
  },
];

const languages = [
  { discover: "Johar Jharkhand", tagline: "Pristine, Indigenous, TimeLess" },
  { discover: "जोहड़ झारखण्ड", tagline: "निर्मल, स्वदेशी, शाश्वत" },
  { discover: "जोहाड़ झारखण्ड", tagline: "निरमल • देसी • अमर" },
  { discover: "जोहार झारुखाड़", tagline: "पोरुस • आदिवासी • दखापर" },
  { discover: "जोहार झारखंड", tagline: "सिरी • होरोको • इतोको" },
  { discover: "जोहार झारखंड", tagline: "सिरि • आदिवासी • लेंदे" },
  { discover: "ᱡᱚᱦᱟᱨ ᱡᱷᱟᱨᱠᱟᱱᱰ", tagline: "ᱥᱟᱡᱟᱞ • ᱰᱤᱥᱚᱢ • ᱪᱮᱸᱰᱚ" }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const langTimer = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(langTimer);
  }, []);

  return (
    <section className="w-full min-h-screen pt-24 relative overflow-hidden flex flex-col justify-center">
      <style>{`
        .fade-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .fade-image.active {
          opacity: 1;
        }
        .text-slide {
          animation: slideIn 0.6s ease-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Background Image Crossfade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`fade-image ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div>
          <h1
            key={`discover-${langIndex}`}
            className="text-white text-4xl md:text-6xl font-extrabold leading-tight text-slide"
          >
            {languages[langIndex].discover}
          </h1>

          <h2
            key={`tagline-${langIndex}`}
            className="text-yellow-400 text-3xl md:text-5xl font-bold mt-2 tracking-tight text-slide"
          >
            {languages[langIndex].tagline}
          </h2>

          <p className="text-gray-200 mt-5 text-lg md:text-xl max-w-lg leading-relaxed">
            Experience the untouched beauty of nature, rich tribal culture,
            and spiritual heritage — now enhanced with AI-powered planning.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/role/tourist/ai-itinerary"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition shadow-lg"
            >
              Plan My Trip →
            </Link>

            <Link
              to="/role/tourist"
              className="px-6 py-3 bg-white/20 border border-white/30 text-white font-medium rounded-lg hover:bg-white/30 transition backdrop-blur-sm"
            >
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* RIGHT-SIDE SLIDING TEXT */}
        <div className="text-right">
          <h2
            key={`title-${current}`}
            className="text-yellow-400 text-3xl md:text-4xl font-bold text-slide"
          >
            {slides[current].title}
          </h2>

          <p
            key={`desc-${current}`}
            className="text-gray-300 mt-3 text-base md:text-lg text-slide"
          >
            {slides[current].desc}
          </p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="relative z-10 mt-10 flex justify-center gap-16 text-white opacity-90">
        <div className="text-center">
          <h3 className="text-3xl font-bold">50+</h3>
          <p className="text-sm opacity-80">Destinations</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">1000+</h3>
          <p className="text-sm opacity-80">Local Artisans</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">24/7</h3>
          <p className="text-sm opacity-80">AI Support</p>
        </div>
      </div>

    </section>
  );
}
