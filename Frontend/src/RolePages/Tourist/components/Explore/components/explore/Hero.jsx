import React from "react";
const Map = "/public/photos/HeroImage/Map.jpg";

export default function Hero() {
  return (
    <div
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${Map})` }}
    >
      {/* Dark Glass Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      {/* Glow Orbs */}
      <div className="absolute top-24 left-24 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-[0_8px_15px_rgba(0,0,0,0.6)] animate-fadeInUp">
          Explore Jharkhand
        </h1>

        <p className="text-lg md:text-2xl text-white/90 font-light mt-6 mb-10 leading-relaxed drop-shadow-md animate-fadeInUp delay-200">
          Discover the land of forests, waterfalls, wildlife & rich cultural heritage
        </p>

        <div className="flex gap-6 justify-center flex-wrap animate-fadeInUp delay-300">
          <button
            onClick={() =>
              document.getElementById("explore-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Exploring
          </button>

          <button
            onClick={() =>
              document.getElementById("explore-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
