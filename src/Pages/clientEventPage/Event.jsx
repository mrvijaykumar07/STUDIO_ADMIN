import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../store/clientSlice";
import { fetchEvents } from "../../store/eventSlice";

import {} from "react-icons/fa";
import api from "../../utils/axios";
import {
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaPhone,
  FaEdit,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import ClientCreatePage from "./ClientCreatePage";
import EventCreatePage from "./EventCreatePage";

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

  const clients = useSelector((state) => state.clients.list) || [];
  const { events, loading } = useSelector((state) => state.events) || [];
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showClientForm, setShowClientForm] = useState(false); 
 const [showEventForm, setShowEventForm] = useState(false); 


  const handleDelete = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await api.delete(`/v1/clients/${clientId}`);
        alert("Client deleted successfully ✅");
        // redux me se remove karna ya fir dobara fetch karna
        dispatch(fetchClients());
      } catch (error) {
        console.error("❌ Error deleting client:", error);
        alert("Failed to delete client");
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/v1/events/${eventId}`);
        alert("Event deleted successfully ✅");
        // TODO: redux se fetchEvents() dispatch karo agar events redux me stored hain
        // dispatch(fetchEvents());
      } catch (error) {
        console.error("❌ Error deleting event:", error);
        alert("Failed to delete event");
      }
    }
  };

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

  useEffect(() => {
    // ✅ Events Fetch
    if (events.length === 0) {
      console.log("📡 Fetching events from backend...");
      dispatch(fetchEvents());
    }

    // ✅ Clients Fetch (on page load)
    if (clients.length === 0) {
      console.log("📡 Fetching clients from backend...");
      dispatch(fetchClients());
    }
  }, [dispatch, events.length, clients.length]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="md:text-3xl text-2xl font-extrabold text-gray-900">
          Client & Events
        </h1>
        <p className="text-gray-600 mt-1">Manage your photography business</p>
      </header>

      {/* Action Buttons */}
      <div className="flex md:flex-wrap gap-4 ">
    
        <button
          className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 md:text-xl text-sm transition"
          onClick={() => setShowEventForm((prev) => !prev)}
        >
          <FaPlus /> {showEventForm ? "Close Event Form" : "New Event"}
        </button>
        {/* Client Create → inline toggle */}
        <button
          className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 md:text-xl text-sm transition"
          onClick={() => setShowClientForm((prev) => !prev)}
        >
          <FaPlus /> {showClientForm ? "Close Client Form" : "New Client"}
        </button>
      </div>

      {/* Inline Client Form */}
      {showClientForm && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-md">
          <ClientCreatePage /> {/* ✅ yahin embed ho jayega */}
        </div>
      )}
       {/* Inline Client Form */}
      {showEventForm && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-md">
          <EventCreatePage/> {/* ✅ yahin embed ho jayega */}
        </div>
      )}
      {/* Page Title & Description */}
      <div>
        <h2 className="text-xl font-semibold">Client & Event Management</h2>
        <p className="text-gray-600">
          Manage your booked events and client relationships
        </p>
      </div>

      {/* Tabs */}
      <nav className="flex gap-4 md:gap-8 border-b border-gray-300 text-gray-700 font-semibold">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "calendar"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaCalendarAlt /> Events
        </button>

        <button
          onClick={() => setActiveTab("checklists")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "checklists"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaClipboardList />
          Checklists
        </button>

        <button
          onClick={() => setActiveTab("clients")}
          className={`flex items-center gap-2 pb-2 ${
            activeTab === "clients"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          <FaUsers /> Clients
        </button>
      </nav>

      {/* Content */}
      <div className="mt-6">
        {/* Calendar View placeholder */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-bold text-lg mb-1">{event.eventName}</h3>
                  <p className="text-gray-700 mb-1">
                    Type:{" "}
                    <span className="font-semibold">{event.eventType}</span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Client:{" "}
                    <span className="font-semibold">
                      {event.clientName || "N/A"}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Date:{" "}
                    <span className="font-semibold">
                      {new Date(event.eventDate?.startDate).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Venue:{" "}
                    <span className="font-semibold">
                      {event.venue?.name}, {event.venue?.address?.city || ""}
                    </span>
                  </p>

                  <div className="flex gap-4 mt-3">
                    {/* Full Details */}
                    <button
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                      onClick={() => navigate(`/events/details/${event._id}`)}
                    >
                      <FaInfoCircle />
                    </button>

                    {/* Edit */}
                    <button
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => navigate(`/events/edit/${event._id}`)}
                    >
                      <FaEdit />
                    </button>

                    {/* Delete */}
                    <button
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No events found</p>
            )}
          </div>
        )}

        {/* Client List */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            {clients.length > 0 ? (
              clients.map((client) => (
                <div
                  key={client._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-bold text-lg mb-1">
                    {client.firstName} {client.lastName}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    Phone: <span className="font-semibold">{client.phone}</span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Email:{" "}
                    <span className="font-semibold">
                      {client.email || "N/A"}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Address:{" "}
                    <span className="font-semibold">
                      {client.address?.street}, {client.address?.city},{" "}
                      {client.address?.state}, {client.address?.zipCode},{" "}
                      {client.address?.country}
                    </span>
                  </p>

                  <div className="flex gap-4 mt-3">
                    {/* Call Button */}
                    <button
                      className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
                      onClick={() => alert(`Calling ${client.phone}`)}
                    >
                      <FaPhone />
                    </button>

                    {/* Edit Button */}
                    <button
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => navigate(`/clients/edit/${client._id}`)} // 👈 navigate with id
                    >
                      <FaEdit />
                    </button>

                    {/* Delete Button */}
                    <button
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                      onClick={() => handleDelete(client._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No clients found</p>
            )}
          </div>
        )}

        {/* Event Checklists */}
        {activeTab === "checklists" && (
          <div className="space-y-6">
            {checklistsData.map((checklist) => {
              const completedCount = checklist.tasks.filter(
                (t) => t.completed
              ).length;
              return (
                <div
                  key={checklist.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-bold text-lg mb-1">
                    {checklist.eventName} - Event Checklist
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {checklist.eventType} on {checklist.eventDate}
                  </p>

                  <ul className="space-y-2 mb-3 text-gray-800">
                    {checklist.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(checklist.id, idx)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span
                          className={
                            task.completed ? "line-through text-gray-400" : ""
                          }
                        >
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






