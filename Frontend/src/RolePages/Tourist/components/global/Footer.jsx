import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-3">Jharkhand Tourism</h2>
            <p className="text-green-200 text-sm leading-relaxed">
              Discover the rich culture, untouched forests, waterfalls, wildlife and
              vibrant tribal heritage of Jharkhand. Your journey begins here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/role/tourist" className="hover:text-green-300">Explore</Link></li>
              <li><Link to="/role/tourist/ai-itinerary" className="hover:text-green-300">Plan Trip</Link></li>
              <li><Link to="/role/tourist/hotels" className="hover:text-green-300">Hotels</Link></li>
              <li><Link to="/role/tourist/events" className="hover:text-green-300">Events</Link></li>
            </ul>
          </div>

          {/* Explore More */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Explore More</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tourist/favorites" className="hover:text-green-300">Saved Places</Link></li>
              <li><Link to="/tourist/bookings" className="hover:text-green-300">My Bookings</Link></li>
              <li><Link to="/tourist/profile" className="hover:text-green-300">Profile</Link></li>
              <li><Link to="/tourist/settings" className="hover:text-green-300">Settings</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <span className="text-green-300">support@jharkhandtourism.in</span></li>
              <li>Phone: <span className="text-green-300">+91 98765 43210</span></li>
              <li>Address: Ranchi, Jharkhand</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-green-700 mt-8 pt-4 text-center">
          <p className="text-sm text-green-300">
            © {new Date().getFullYear()} Jharkhand Tourism. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
