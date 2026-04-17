import { FaBrain, FaShieldAlt, FaLeaf } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

const features = [
  {
    icon: <FaBrain className="text-green-700 text-4xl" />,
    title: "AI-Powered Planning",
    desc: "Smart itineraries tailored to your interests, budget, and time using advanced AI",
  },
  {
    icon: <FaLeaf className="text-green-600 text-4xl" />,
    title: "Eco-Friendly Tourism",
    desc: "Sustainable travel options that preserve Jharkhand's natural beauty",
  },
  {
    icon: <FaShieldAlt className="text-orange-700 text-4xl" />,
    title: "Safe & Secure",
    desc: "Verified vendors and secure payments",
  },
  {
    icon: <MdEventAvailable className="text-yellow-600 text-4xl" />,
    title: "Easy Booking",
    desc: "Book hotels, transport, guides, and experiences all in one place",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose TourEzze?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              bg-white shadow-md border border-gray-200 rounded-xl p-8
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300
            "
          >
            <div className="mb-4">{item.icon}</div>

            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

            <p className="text-gray-600 leading-relaxed text-[15px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
