import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import EventCalendar from "../Components/EventCalender";

const eventsData = [
  {
    id: 1,
    name: "Sharma Wedding",
    type: "Wedding",
    date: "Aug 15, 2025",
    client: "Mrs. Priya Sharma",
    location: "Taj Palace Hotel, Delhi",
    time: "10:00 AM - 8:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Gupta Anniversary",
    type: "Anniversary",
    date: "Aug 18, 2025",
    client: "Mr. Raj Gupta",
    location: "Home - Sector 15, Noida",
    time: "5:00 PM - 9:00 PM",
    status: "confirmed",
  },
];

// Initial checklist data with completed flag for each task
const initialChecklistsData = [
  {
    id: 1,
    eventName: "Sharma Wedding",
    eventType: "Wedding",
    eventDate: "8/15/2025",
    tasks: [
      { text: "Pre-wedding consultation", completed: false },
      { text: "Equipment check", completed: false },
      { text: "Venue recce", completed: false },
      { text: "Shot list preparation", completed: false },
      { text: "Backup equipment ready", completed: false },
    ],
  },
  {
    id: 2,
    eventName: "Gupta Anniversary",
    eventType: "Anniversary",
    eventDate: "8/18/2025",
    tasks: [
      { text: "Discuss photo requirements", completed: false },
      { text: "Check lighting setup", completed: false },
      { text: "Prepare props", completed: false },
    ],
  },
];

const ClientEventsPage = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [checklistsData, setChecklistsData] = useState(initialChecklistsData);

  // Toggle checkbox for a task
  const toggleTask = (checklistId, taskIndex) => {
    setChecklistsData((prev) =>
      prev.map((checklist) => {
        if (checklist.id === checklistId) {
          const updatedTasks = checklist.tasks.map((task, idx) =>
            idx === taskIndex ? { ...task, completed: !task.completed } : task
          );
          return { ...checklist, tasks: updatedTasks };
        }
        return checklist;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900">Client & Events</h1>
        <p className="text-gray-600 mt-1">Manage your photography business</p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition">
          <FaPlus /> Add New Event
        </button>
        <button className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition">
          <FaPlus />  Add New Client
        </button>
      </div>

      {/* Page Title & Description */}
      <div>
        <h2 className="text-xl font-semibold">Client & Event Management</h2>
        <p className="text-gray-600">Manage your booked events and client relationships</p>
      </div>

      {/* Tabs */}
      <nav className="flex gap-8 border-b border-gray-300 text-gray-700 font-semibold">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "calendar"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaCalendarAlt /> Calendar View
        </button>
        <button
          onClick={() => setActiveTab("clients")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "clients"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaUsers /> Client List
        </button>
        <button
          onClick={() => setActiveTab("checklists")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "checklists"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaClipboardList /> Event Checklists
        </button>
      </nav>

      {/* Content */}
      <div className="mt-6">
        {/* Calendar View placeholder */}
        {activeTab === "calendar" && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
            <EventCalendar/>
          </div>
        )}

        {/* Client List */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            {eventsData.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="font-bold text-lg mb-1">{event.name}</h3>
                <p className="text-gray-700 mb-1">
                  {event.type} <span className="ml-2 font-semibold">{event.date}</span>
                </p>
                <p className="text-gray-700 mb-1">Client: <span className="font-semibold">{event.client}</span></p>
                <p className="text-gray-700 mb-1">{event.location}</p>
                <p className="text-gray-700 mb-3">{event.time}</p>
                <p className={`inline-block px-3 py-1 rounded-full font-semibold text-sm mb-3 ${
                  event.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                }`}>
                  {event.status}
                </p>
                <div className="flex gap-4">
                  <button
                    className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
                    onClick={() => alert(`Calling ${event.client}`)}
                  >
                    <FaPhone /> Call
                  </button>
                  <button
                    className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
                    onClick={() => alert(`Emailing ${event.client}`)}
                  >
                    <FaEnvelope /> Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Checklists */}
        {activeTab === "checklists" && (
          <div className="space-y-6">
            {checklistsData.map((checklist) => {
              const completedCount = checklist.tasks.filter((t) => t.completed).length;
              return (
                <div
                  key={checklist.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-bold text-lg mb-1">{checklist.eventName} - Event Checklist</h3>
                  <p className="text-gray-700 mb-3">{checklist.eventType} on {checklist.eventDate}</p>

                  <ul className="space-y-2 mb-3 text-gray-800">
                    {checklist.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(checklist.id, idx)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className={task.completed ? "line-through text-gray-400" : ""}>
                          {task.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mb-3 font-semibold text-gray-700">
                    {completedCount} of {checklist.tasks.length} completed
                  </p>

                  <button className="text-pink-600 font-semibold hover:underline">
                    + Add Task
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientEventsPage;
