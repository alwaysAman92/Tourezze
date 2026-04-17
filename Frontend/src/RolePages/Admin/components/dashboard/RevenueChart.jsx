import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", hotel: 900000, transport: 450000 },
  { month: "Feb", hotel: 950000, transport: 470000 },
  { month: "Mar", hotel: 1000000, transport: 490000 },
  { month: "Apr", hotel: 1050000, transport: 510000 },
  { month: "May", hotel: 1100000, transport: 520000 },
  { month: "Jun", hotel: 950000, transport: 470000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border h-[340px]">
      <h3 className="font-semibold mb-3">Revenue Generated</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hotel" stackId="a" fill="#16a34a" />
          <Bar dataKey="transport" stackId="a" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
