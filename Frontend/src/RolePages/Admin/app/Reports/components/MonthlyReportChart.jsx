import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", hotels: 450000, transport: 280000 },
  { month: "Feb", hotels: 480000, transport: 310000 },
  { month: "Mar", hotels: 520000, transport: 330000 },
  { month: "Apr", hotels: 550000, transport: 350000 },
];

export default function MonthlyReportChart() {
  return (
    <div className="bg-white p-6 border rounded-xl shadow-sm">

      <h2 className="text-lg font-semibold mb-4">Monthly Revenue Report</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="hotels" stackId="a" fill="#16a34a" />
          <Bar dataKey="transport" stackId="a" fill="#facc15" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
