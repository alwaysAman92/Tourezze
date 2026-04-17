import { API_BASE } from '../../../../config/api';
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllPackage() {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/tour-packages/`);
      setPackages(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePackage = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      await axios.delete(`${API_BASE}/api/admin/tour-packages/${id}`);
      alert("Package deleted!");
      fetchPackages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="p-6 pl-[260px] transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-6">All Tour Packages</h2>

      {packages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="p-5 border border-gray-300 bg-white rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold mb-2">{pkg.packageName}</h3>

              <p>
                <span className="font-semibold">Location:</span> {pkg.location}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ₹{pkg.price}
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {pkg.duration}
              </p>

              <button
                onClick={() => deletePackage(pkg._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
