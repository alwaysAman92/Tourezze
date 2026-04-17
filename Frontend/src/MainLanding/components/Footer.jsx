import { Link } from "react-router-dom";
import { Mountain, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-yellow-300" />
              <span className="text-2xl font-bold tracking-wide">TourEzze</span>
            </div>
            <p className="text-sm text-gray-200">
              Discover Jharkhand with smart, safe & sustainable tourism.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-yellow-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/itinerary" className="hover:text-yellow-300 transition">
                  Plan Trip
                </Link>
              </li>
              <li>
                <a href="#destinations" className="hover:text-yellow-300 transition">
                  Destinations
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Connect With Us</h3>

            <div className="flex gap-4 mb-4">
              <a href="#" aria-label="Facebook" className="hover:text-yellow-300 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-yellow-300 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-yellow-300 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Email" className="hover:text-yellow-300 transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>

            <p className="text-sm text-gray-200">
              Emergency Helpline: <span className="font-semibold text-yellow-300">1800-123-4567</span>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-gray-300">
          © 2024 TourEzze — A Smart Tourism Initiative for Jharkhand.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
