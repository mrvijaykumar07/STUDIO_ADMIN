// src/components/EditEvent.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../utils/axios";
import { FaArrowLeft } from "react-icons/fa";

const EditEvent = ({ eventId, onSuccess, onCancel }) => {
  // ---------------- Individual States ----------------
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [assignedPhotographer, setAssignedPhotographer] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [venueName, setVenueName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateAddr, setStateAddr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  // ---------------- Fetch existing data ----------------
  useEffect(() => {
    if (!eventId) return;
    let ignore = false;
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/v1/events/${eventId}`);
        if (!ignore && res.data?.success) {
          const data = res.data.data;
          setEventName(data.eventName || "");
          setEventType(data.eventType || "");
          setClientId(data.clientId || "");
          setClientName(data.clientName || "");
          setClientEmail(data.clientEmail || "");
          setClientPhone(data.clientPhone || "");
          setAssignedPhotographer(data.assignedPhotographer || "");
          setStartDate(data.eventDate?.startDate ? new Date(data.eventDate.startDate) : null);
          setEndDate(data.eventDate?.endDate ? new Date(data.eventDate.endDate) : null);
          setVenueName(data.venue?.name || "");
          setStreet(data.venue?.address?.street || "");
          setCity(data.venue?.address?.city || "");
          setStateAddr(data.venue?.address?.state || "");
          setZipCode(data.venue?.address?.zipCode || "");
          setCountry(data.venue?.address?.country || "");
          setDescription(data.description || "");
        }
      } catch (err) {
        console.error("❌ Error fetching event:", err);
      }
    };
    fetchEvent();
    return () => { ignore = true; };
  }, [eventId]);

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !eventType || !clientId || !startDate) {
      alert("⚠️ Please fill required fields");
      return;
    }

    const payload = {
      eventName,
      eventType: eventType.toLowerCase(),
      clientId,
      clientName,
      clientEmail,
      clientPhone,
      assignedPhotographer,
      eventDate: {
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
      },
      venue: {
        name: venueName,
        address: { street, city, state: stateAddr, zipCode, country },
      },
      description,
    };

    try {
      const res = await api.put(`/v1/events/${eventId}`, payload);
      if (res.data?.success) {
        alert("✅ Event updated successfully!");
        if (onSuccess) onSuccess();
      } else {
        alert("❌ Failed to update event.");
      }
    } catch (err) {
      console.error("❌ Error updating event:", err);
      alert("❌ Error updating event. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0  flex items-center justify-center z-50 md:static md:flex-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto md:rounded-none md:shadow-none md:max-w-none md:fixed md:right-0 md:top-0 md:h-screen md:w-[80vw]"
        >
       




<div className="sticky top-0 bg-white p-4 border-b z-10 flex items-center justify-between">

  {/* Left: Back Arrow */}
  <button
    type="button"
    onClick={onCancel}
    className="text-gray-600 hover:text-gray-800"
  >
    <FaArrowLeft size={20} />
  </button>

  {/* Center: Title */}
  <h2 className="text-2xl font-bold text-gray-800 ml-2 flex-1">
    Edit Event
  </h2>

  {/* Right: Update Button */}
<button
  type="submit"
  form="editEventForm"
  className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
>
  Update
</button>

</div>




        <form id="editEventForm" onSubmit={handleSubmit} className="space-y-4 p-6">

            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter Event Name"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
              <input
                type="text"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                placeholder="Enter Event Type"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter Client Name"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Client Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Enter Client Email"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Client Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Phone</label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="Enter Client Phone"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Event Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Choose Start Date"
                  className="border p-2 rounded-md w-full cursor-pointer text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="Choose End Date"
                  className="border p-2 rounded-md w-full cursor-pointer text-sm"
                />
              </div>
            </div>

            {/* Venue Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="Enter Venue Name"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Assigned Photographer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Photographer</label>
              <input
                type="text"
                value={assignedPhotographer}
                onChange={(e) => setAssignedPhotographer(e.target.value)}
                placeholder="Enter Photographer Name"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street"
                  className="border p-2 rounded-md w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="border p-2 rounded-md w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={stateAddr}
                  onChange={(e) => setStateAddr(e.target.value)}
                  placeholder="State"
                  className="border p-2 rounded-md w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip Code"
                  className="border p-2 rounded-md w-full text-sm"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="border p-2 rounded-md w-full text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Event Description"
                className="border p-2 rounded-md w-full mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditEvent;
