import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ setAuthType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Load user
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Load cart items
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("tour_cart")) || [];
    setCartCount(cart.length);
  }, []);

  const navLinks = [
    { to: "/role/tourist", label: "Explore" },
    { to: "/role/tourist/ai-itinerary", label: "Plan" },
    { to: "/role/tourist/hotels", label: "Hotels" },
    { to: "/role/tourist/packages", label: "Packages" },
    { to: "/role/tourist/events", label: "Events" },
  ];

  const getInitials = (name = "") =>
    name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <>
      <nav className="bg-green-900 fixed top-0 w-full z-[999] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/Photos/NavbarLogo/logo.png" className="w-10 h-10" alt="Logo" />
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Jharkhand</h1>
              <p className="text-green-300 text-[10px] tracking-widest -mt-1">TOURISM</p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white text-sm font-medium hover:text-green-300 transition"
              >
                {link.label}
              </Link>
            ))}

            {/* CART ICON */}
            <Link
              to="/role/tourist/cart"
              className="relative text-white hover:text-green-300"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* LOGIN CLICK */}
            {!isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setLoginDropdown((prev) => !prev)}
                  className="bg-white text-green-900 px-4 py-1.5 rounded-md font-semibold shadow hover:bg-green-100 transition"
                >
                  Login ▾
                </button>

                {loginDropdown && (
                  <div className="absolute right-0 w-64 bg-white shadow-xl rounded-md mt-2 z-50">
                    <div className="flex justify-between px-4 py-3 border-b">
                      <span className="font-semibold text-gray-800">Welcome</span>
                      <span
                        className="text-green-700 cursor-pointer font-semibold"
                        onClick={() => setAuthType("signup")}
                      >
                        Sign Up
                      </span>
                    </div>

                    <button
                      onClick={() => setAuthType("login")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      Login Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* USER DROPDOWN (Click Only) */}
            {isLoggedIn && user && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown((prev) => !prev)}
                  className="flex items-center gap-2 bg-green-800 text-white px-3 py-1.5 rounded-full shadow hover:bg-green-700 transition"
                >
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {getInitials(user?.name)}
                  </div>
                  <span>{user?.name.split(" ")[0]}</span>
                  ▾
                </button>

                {userDropdown && (
                  <div className="absolute right-0 w-64 bg-white shadow-xl rounded-md mt-2 z-50">

                    <div className="p-4 border-b bg-green-50">
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-700">{user?.email}</p>
                    </div>

                    <Link className="block px-4 py-2 hover:bg-gray-50" to="/tourist/profile">
                      My Profile
                    </Link>

                    <Link className="block px-4 py-2 hover:bg-gray-50" to="/tourist/bookings">
                      My Bookings
                    </Link>

                    <hr />

                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg p-4 space-y-3">

            <Link
              to="/role/tourist/cart"
              className="block py-2 text-gray-800 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              🛒 Cart ({cartCount})
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block text-gray-800 py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <button
                onClick={() => setAuthType("login")}
                className="w-full py-2 bg-green-700 text-white rounded-md"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full py-2 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      <div className="h-16"></div>
    </>
  );
}
