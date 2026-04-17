import MainLayout from "../../../global/Layout";
import { CheckCircle, PauseCircle, AlertCircle, Edit, Trash2, Star, Store } from "lucide-react";

export default function Vendors() {
  const vendors = [
    {
      name: "Jharkhand Handicrafts",
      location: "Ranchi",
      status: "Verified",
      rating: 4.6,
      orders: 1540,
      revenue: "₹12.4L"
    },
    {
      name: "Tribal Art Emporium",
      location: "Jamshedpur",
      status: "Pending",
      rating: 4.1,
      orders: 980,
      revenue: "₹6.8L"
    },
    {
      name: "Dokra Metal Works",
      location: "Hazaribagh",
      status: "Verified",
      rating: 4.8,
      orders: 1890,
      revenue: "₹15.2L"
    },
    {
      name: "Jharkhand Spices Hub",
      location: "Deoghar",
      status: "Suspended",
      rating: 3.8,
      orders: 450,
      revenue: "₹2.3L"
    },
  ];

  return (
    <MainLayout>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vendors</h1>
          <p className="text-gray-600">Manage vendors across Jharkhand</p>
        </div>

        <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md">
          Add New Vendor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <Card title="Total Vendors" value="489" color="text-gray-800" />
        <Card title="Verified" value="356" color="text-green-600" />
        <Card title="Pending Approval" value="102" color="text-yellow-600" />
        <Card title="Suspended" value="31" color="text-red-600" />

      </div>

      {/* Vendor Table */}
      <div className="bg-white p-6 border rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-4">Vendor Listings</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Vendor</th>
              <th className="py-2">Location</th>
              <th className="py-2">Status</th>
              <th className="py-2">Rating</th>
              <th className="py-2">Orders</th>
              <th className="py-2">Revenue</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">

                <td className="py-3 flex items-center gap-2">
                  <Store size={18} className="text-green-700" />
                  {vendor.name}
                </td>

                <td className="py-3 text-gray-700">{vendor.location}</td>

                <td className="py-3">
                  {vendor.status === "Verified" && (
                    <Badge text="Verified" color="green" icon={<CheckCircle size={14} />} />
                  )}

                  {vendor.status === "Pending" && (
                    <Badge text="Pending" color="yellow" icon={<PauseCircle size={14} />} />
                  )}

                  {vendor.status === "Suspended" && (
                    <Badge text="Suspended" color="red" icon={<AlertCircle size={14} />} />
                  )}
                </td>

                <td className="py-3 flex items-center gap-1 text-gray-700">
                  <Star size={16} className="text-yellow-500" />
                  {vendor.rating}
                </td>

                <td className="py-3">{vendor.orders}</td>

                <td className="py-3 font-medium">{vendor.revenue}</td>

                <td className="py-3 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </MainLayout>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-5 border rounded-xl shadow-sm">
      <p className="text-gray-700">{title}</p>
      <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}

function Badge({ text, icon, color }) {
  const colors = {
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 w-fit ${colors[color]}`}>
      {icon} {text}
    </span>
  );
}
