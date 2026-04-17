import { useEffect, useState } from "react";
import { API_BASE } from "../../../../config/api";
import { Link } from "react-router-dom";

export default function AllPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/tour-packages/`);
      const data = await res.json();
      if (data.success) {
        setPackages(data.data);
      } else {
        setError("Failed to load packages");
      }
    } catch (err) {
      setError("Failed to load packages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf5ef] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Tour Packages</h2>

        {packages.length === 0 ? (
          <p className="text-center text-gray-600">No packages available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {pkg.images && pkg.images[0] && (
                  <img
                    src={pkg.images[0]}
                    alt={pkg.packageName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pkg.packageName}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">₹{pkg.price}</span>
                    <span className="text-sm text-gray-500">{pkg.duration} days</span>
                  </div>
                  <Link
                    to={`/role/tourist/book-package/${pkg._id}`}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
