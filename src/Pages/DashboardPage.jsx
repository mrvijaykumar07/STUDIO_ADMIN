import React from "react";
import {
  FaUsers,
  FaUserCheck,
  FaRupeeSign,
  FaPercentage,
  FaCalendarAlt,
  FaCameraRetro,
  FaHandshake,
} from "react-icons/fa";
import EventCalendar from "../Components/EventCalender";

const DashboardPage = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 bg-gradient-to-br from-pink-50 via-white to-pink-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="md:text-3xl text-2xl  font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your photography business in one place
          </p>
        </div>
        <button className="bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition shadow-md">
          + Quick Add
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Leads",
            value: "156",
            change: "+12% from last month",
            icon: <FaUsers className="text-pink-600 text-2xl" />,
            changeColor: "text-green-600",
          },
          {
            title: "Active Clients",
            value: "42",
            change: "managing currently",
            icon: <FaUserCheck className="text-blue-600 text-2xl" />,
            changeColor: "text-gray-600",
          },
          {
            title: "Monthly Revenue",
            value: "₹185,000",
            change: "+18% from last month",
            icon: <FaRupeeSign className="text-green-600 text-2xl" />,
            changeColor: "text-green-600",
          },
          {
            title: "Conversion Rate",
            value: "68%",
            change: "excellent performance",
            icon: <FaPercentage className="text-purple-600 text-2xl" />,
            changeColor: "text-green-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-md p-5 rounded-lg shadow hover:shadow-lg transition flex items-start gap-4"
          >
            {stat.icon}
            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                {stat.title}
              </h2>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.changeColor}`}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>
<EventCalendar/>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaCameraRetro className="text-pink-600" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                text: "New lead: Wedding inquiry from Priya & Raj",
                time: "2 hours ago",
                status: "new",
                statusColor: "text-pink-600",
              },
              {
                text: "Payment received from Sharma Wedding",
                time: "4 hours ago",
                status: "completed",
                statusColor: "text-green-600",
              },
              {
                text: "Photo shoot completed: Gupta Anniversary",
                time: "1 day ago",
                status: "completed",
                statusColor: "text-green-600",
              },
              {
                text: "Contract signed: Kumar Pre-wedding shoot",
                time: "2 days ago",
                status: "signed",
                statusColor: "text-blue-600",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold">{activity.text}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
                <span
                  className={`${activity.statusColor} font-semibold capitalize`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>




        {/* Upcoming Events */}
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" /> Upcoming Events
          </h2>
          <div className="space-y-4">
            {[
              {
                name: "Sharma Wedding",
                date: "Aug 15, 2025",
                status: "Wedding - confirmed",
                statusColor: "text-green-600",
              },
              {
                name: "Patel Anniversary",
                date: "Aug 18, 2025",
                status: "Anniversary - confirmed",
                statusColor: "text-green-600",
              },
              {
                name: "Kumar Pre-wedding",
                date: "Aug 22, 2025",
                status: "Pre-wedding - planning",
                statusColor: "text-yellow-600",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-gray-500 text-sm">{event.date}</p>
                </div>
                <span
                  className={`${event.statusColor} font-semibold capitalize`}
                >
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
