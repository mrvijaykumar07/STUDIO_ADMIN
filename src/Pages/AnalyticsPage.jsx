import React from "react";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { FaUsers, FaMoneyBillWave, FaStar, FaCalendarAlt } from "react-icons/fa";

const AnalyticsPage = () => {
  // Sample Data
  const revenueTrend = [
    { month: "Jan", revenue: 150000 },
    { month: "Feb", revenue: 175000 },
    { month: "Mar", revenue: 160000 },
    { month: "Apr", revenue: 200000 },
    { month: "May", revenue: 185000 },
    { month: "Jun", revenue: 210000 },
  ];

  const leadSources = [
    { name: "Instagram", value: 35 },
    { name: "Facebook", value: 25 },
    { name: "Website", value: 22 },
    { name: "Referrals", value: 18 },
  ];
  const COLORS = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24"];

  const packagePopularity = [
    { name: "Premium Wedding", bookings: 15 },
    { name: "Basic Wedding", bookings: 12 },
    { name: "Pre-Wedding", bookings: 8 },
    { name: "Anniversary", bookings: 6 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="md:text-3xl text-xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500 hidden md:flex">Insights to grow your photography business</p>
        </div>
     <div className="relative inline-block">
  <select
    className="appearance-none border border-gray-300 rounded-full px-4 py-2 pr-10 text-gray-700 text-sm bg-white shadow-sm outline-none cursor-pointer"
  >
    <option>This Month</option>
    <option>Last Month</option>
    <option>This Year</option>
  </select>

  {/* Custom arrow */}
  <svg
    className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-1">
          <FaMoneyBillWave className="text-green-500 text-2xl" />
          <span className="text-gray-500 text-sm">Total Revenue</span>
          <h2 className="text-2xl font-bold">₹1,85,000</h2>
          <span className="text-xs text-red-500">-5.1% from last month</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-1">
          <FaUsers className="text-blue-500 text-2xl" />
          <span className="text-gray-500 text-sm">Leads Conversion</span>
          <h2 className="text-2xl font-bold">68%</h2>
          <span className="text-xs text-gray-400">106 of 156 leads</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-1">
          <FaCalendarAlt className="text-pink-500 text-2xl" />
          <span className="text-gray-500 text-sm">Avg. Booking Value</span>
          <h2 className="text-2xl font-bold">₹75,000</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-1">
          <FaStar className="text-yellow-500 text-2xl" />
          <span className="text-gray-500 text-sm">Client Satisfaction</span>
          <h2 className="text-2xl font-bold">4.8/5</h2>
          <span className="text-xs text-gray-400">Based on 89 reviews</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#f472b6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leadSources}
                dataKey="value"
                outerRadius={80}
                label
              >
                {leadSources.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Package Popularity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">Package Popularity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={packagePopularity}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
