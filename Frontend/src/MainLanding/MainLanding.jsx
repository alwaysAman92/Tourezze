import React, { useRef } from "react";
import Navbar from "./components/MainNavbar";
import HeroSection from "./components/HeroSection";
import Explore from "./components/Explore";
import WhyChooseUs from "./components/WhyChoose";
import CultureSection from "./components/CultureSection";
import RoleSelector from "./components/RoleSelector";
import Events from "./components/Events";
import Footer from "./components/Footer";

export default function MainLanding() {
  const exploreRef = useRef(null);
  const roleRef = useRef(null);
  const eventsRef = useRef(null);

  return (
    <div>
      <Navbar 
        exploreRef={exploreRef} 
        roleRef={roleRef} 
        eventsRef={eventsRef}
      />

      <HeroSection />
      <CultureSection />
     

      {/* EXPLORE SECTION */}
      <div ref={exploreRef}>
        <Explore />
      </div>

      {/* EVENTS SECTION */}
      <div ref={eventsRef}>
        <Events />
      </div>

      {/* ROLE SECTION */}
      <div ref={roleRef}>
        <RoleSelector />
      </div>
       <WhyChooseUs />
      <Footer/>
    </div>
  );
}
