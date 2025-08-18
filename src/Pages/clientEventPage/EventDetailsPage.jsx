import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { FaEdit, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaFileAlt } from "react-icons/fa";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/v1/events/${id}`);
        setEvent(res.data?.data || res.data || null);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        alert("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return <p className="text-center mt-6 text-gray-500">Loading event details...</p>;
  if (!event)
    return <p className="text-center mt-6 text-red-500">Event not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">{event?.eventName || "N/A"}</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate(`/events/edit/${event?._id}`)}
          >
            <FaEdit /> Edit
          </button>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mt-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-pink-600" /> 
            <span><strong>Client:</strong> {event?.clientName || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" /> 
            <span>
              <strong>Date:</strong>{" "}
              {event?.eventDate?.startDate
                ? new Date(event.eventDate.startDate).toLocaleString()
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-blue-600" /> 
            <span><strong>Type:</strong> {event?.eventType || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-600" /> 
            <span>
              <strong>Venue:</strong>{" "}
              {event?.venue?.name
                ? `${event.venue.name}${event.venue?.address?.city ? `, ${event.venue.address.city}` : ""}`
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700">{event?.description || "No description available."}</p>
        </div>

        {/* Optional Sections: Budget, Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event?.budget && (
            <div className="bg-pink-50 p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-pink-600 mb-1">Budget</h3>
              <p>Total: {event.budget.total} {event.budget.currency}</p>
              <p>Spent: {event.budget.spent} {event.budget.currency}</p>
            </div>
          )}

          {event?.guestCount && (
            <div className="bg-green-50 p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-green-600 mb-1">Guests</h3>
              <p>Expected: {event.guestCount.expected}</p>
              <p>Confirmed: {event.guestCount.confirmed}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
