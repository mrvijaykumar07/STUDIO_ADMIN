import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../../store/eventSlice";
import { deleteClient, fetchClients } from "../../store/clientSlice";
import EditEvent from "./EditEvent";
import EditClient from "./EditClient";

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

  const [editingClientId, setEditingClientId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showClientForm, setShowClientForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const clientsState = useSelector((state) => state.clients);
  const eventsState = useSelector((state) => state.events);

  const clients = clientsState?.list || [];
  const events = eventsState?.events || [];
  const loading = eventsState?.loading || false;

  // Delete client
const handleDeleteClient = (clientId) => {
  if (window.confirm("Are you sure you want to delete this client?")) {
    dispatch(deleteClient(clientId))
      .unwrap()
      .then(() => {
        alert("Client deleted successfully ✅");
        dispatch(fetchClients()); // Optional: refresh client list
      })
      .catch(() => alert("Failed to delete client ❌"));
  }
};

  // Delete event using redux thunk
  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(eventId))
        .unwrap()
        .then(() => alert("Event deleted successfully ✅"))
        .catch(() => alert("Failed to delete event ❌"));
    }
  };

  // Toggle checklist tasks
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

  // Fetch events and clients on load
  useEffect(() => {
    if (events.length === 0) dispatch(fetchEvents());
    if (clients.length === 0) dispatch(fetchClients());
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
        {/* Event Button */}
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-md md:text-xl text-sm transition
            ${
              showEventForm
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-pink-600 hover:bg-pink-700"
            } text-white`}
          onClick={() => setShowEventForm((prev) => !prev)}
        >
          <FaPlus /> {showEventForm ? "Close Event Form" : "New Event"}
        </button>

        {/* Client Button */}
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-md md:text-xl text-sm transition
            ${
              showClientForm
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-pink-600 hover:bg-pink-700"
            } text-white`}
          onClick={() => setShowClientForm((prev) => !prev)}
        >
          <FaPlus /> {showClientForm ? "Close Client Form" : "New Client"}
        </button>
      </div>

      {/* Inline Event Form */}
      {showEventForm && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-md">
          <EventCreatePage
            onSuccess={() => {
              setShowEventForm(false);
              dispatch(fetchEvents());
            }}
          />
        </div>
      )}

      {/* Inline Client Form */}
      {showClientForm && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-md">
          <ClientCreatePage
            onSuccess={() => {
              setShowClientForm(false);
              dispatch(fetchClients());
            }}
          />
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
          <FaClipboardList /> Checklists
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
        {/* Calendar / Events */}
        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map((event) => {
                const renderField = (label, value) => {
                  if (!value) return null;
                  return (
                    <p>
                      <span className="font-semibold text-gray-900">
                        {label}:
                      </span>{" "}
                      {value}
                    </p>
                  );
                };

                return (
                  <div
                    key={event._id}
                    className="bg-white py-6 px-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <h3 className="font-bold text-xl text-center text-gray-800 mb-4">
                      {event.eventName}
                    </h3>

                    <div className="space-y-2 text-gray-700">
                      {renderField("Type", event.eventType)}
                      {renderField("Client", event.clientName)}

                      {event.eventDate?.startDate &&
                        event.eventDate?.endDate &&
                        renderField(
                          "Date",
                          `${new Date(
                            event.eventDate.startDate
                          ).toLocaleDateString("en-GB")} to ${new Date(
                            event.eventDate.endDate
                          ).toLocaleDateString("en-GB")}`
                        )}

                      {event.venue?.name &&
                        renderField("Venue Name", event.venue.name)}

                      {event.venue?.address &&
                        (event.venue.address.street ||
                          event.venue.address.city ||
                          event.venue.address.state ||
                          event.venue.address.zipCode) &&
                        renderField(
                          "Address",
                          [
                            event.venue.address.street,
                            event.venue.address.city,
                            event.venue.address.state,
                            event.venue.address.zipCode,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        )}

                      {renderField("Photographer", event.assignedPhotographer)}
                      {renderField("Budget", event.budget?.total)}
                      {renderField("Deposit", event.deposit?.amount)}
                      
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-10 mt-auto pt-5 text-2xl">
                      <button
                        className="text-gray-600 hover:text-gray-800 transition-transform duration-200 transform hover:scale-125"
                        onClick={() => navigate(`/events/details/${event._id}`)}
                      >
                        <FaInfoCircle />
                      </button>

                      <button
                        className="text-blue-600 hover:text-blue-800 transition-transform duration-200 transform hover:scale-125"
                        onClick={() => setEditingEventId(event._id)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-800 transition-transform duration-200 transform hover:scale-125"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Inline Edit Form */}
                    {editingEventId === event._id && (
                      <div className="mt-4">
                        <EditEvent
                          eventId={editingEventId}
                          onSuccess={() => {
                            setEditingEventId(null);
                            dispatch(fetchEvents());
                          }}
                          onCancel={() => setEditingEventId(null)}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600 text-center col-span-3">
                No events found
              </p>
            )}
          </div>
        )}

        {/* Clients */}
        {activeTab === "clients" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
            {clients.length > 0 ? (
              clients.map((client) => (
                <div
                  key={client._id}
                  className="bg-white md:p-6 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  <h3 className="font-bold text-xl text-center text-gray-800 mb-4">
                    {client.firstName} {client.lastName}
                  </h3>

                  <div className="space-y-2 text-gray-700">
                    {client.phone && (
                      <p>
                        <span className="font-semibold text-gray-900">
                          Phone:
                        </span>{" "}
                        {client.phone}
                      </p>
                    )}
                    {client.email && (
                      <p>
                        <span className="font-semibold text-gray-900">
                          Email:
                        </span>{" "}
                        {client.email}
                      </p>
                    )}
                    {client.address &&
                      (client.address.street ||
                        client.address.city ||
                        client.address.state ||
                        client.address.zipCode) && (
                        <p>
                          <span className="font-semibold text-gray-900">
                            Address:
                          </span>{" "}
                          {[
                            client.address.street,
                            client.address.city,
                            client.address.state,
                            client.address.zipCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-10 mt-auto pt-5 text-2xl">
                    <button
                      className="text-green-600 hover:text-green-800 transition-transform duration-200 transform hover:scale-125"
                      onClick={() => alert(`Calling ${client.phone}`)}
                    >
                      <FaPhone />
                    </button>

                    <button
                      className="text-blue-600 hover:text-blue-800 transition-transform duration-200 transform hover:scale-125"
                      onClick={() => setEditingClientId(client._id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 transition-transform duration-200 transform hover:scale-125"
                      onClick={() => handleDeleteClient(client._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Inline Edit Form */}
                  {editingClientId === client._id && (
                    <div className="mt-4">
                      <EditClient
                        clientId={editingClientId}
                        onSuccess={() => {
                          setEditingClientId(null);
                          dispatch(fetchClients());
                        }}
                        onCancel={() => setEditingClientId(null)}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-3">
                No clients found
              </p>
            )}
          </div>
        )}

        {/* Checklists */}
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
