import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import api from "../../utils/axios";

const EventCreatePage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  // ✅ Default state
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    clientId: "",
    eventDate: {
      startDate: "",
      endDate: "",
      setupTime: "",
      teardownTime: "",
    },
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    assignedPhotographer: "",
    venue: {
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      coordinates: {
        latitude: "",
        longitude: "",
      },
    },
    guestCount: {
      expected: "",
      confirmed: "",
    },
    budget: {
      total: "",
      spent: "",
      currency: "USD",
    },
    status: "planning",
    description: "",
    theme: "",
    colorScheme: {
      primary: "",
      secondary: "",
      accent: "",
    },
  });

  const [showOptional, setShowOptional] = useState(false);

  // ✅ Edit mode data fetch
// ✅ Edit mode data fetch
useEffect(() => {
  if (!eventId) return;

  let ignore = false;
  const fetchEventById = async () => {
    try {
      const res = await api.get(`/v1/events/${eventId}`);
      if (!ignore && res.data?.success) {
        const data = res.data.data;

        setFormData({
          eventName: data.eventName || "",
          eventType: data.eventType || "",
          clientId: data.clientId || "",
          eventDate: {
            startDate: data.eventDate?.startDate || "",
            endDate: data.eventDate?.endDate || "",
            setupTime: data.eventDate?.setupTime || "",
            teardownTime: data.eventDate?.teardownTime || "",
          },
          clientName: data.clientName || "",
          clientEmail: data.clientEmail || "",
          clientPhone: data.clientPhone || "",
          assignedPhotographer: data.assignedPhotographer || "",
          venue: {
            name: data.venue?.name || "",
            address: {
              street: data.venue?.address?.street || "",
              city: data.venue?.address?.city || "",
              state: data.venue?.address?.state || "",
              zipCode: data.venue?.address?.zipCode || "",
              country: data.venue?.address?.country || "",
            },
            coordinates: {
              latitude: data.venue?.coordinates?.latitude || "",
              longitude: data.venue?.coordinates?.longitude || "",
            },
          },
          guestCount: {
            expected: data.guestCount?.expected || "",
            confirmed: data.guestCount?.confirmed || "",
          },
          budget: {
            total: data.budget?.total || "",
            spent: data.budget?.spent || "",
            currency: data.budget?.currency || "USD",
          },
          status: data.status || "planning",
          description: data.description || "",
          theme: data.theme || "",
          colorScheme: {
            primary: data.colorScheme?.primary || "",
            secondary: data.colorScheme?.secondary || "",
            accent: data.colorScheme?.accent || "",
          },
        });
      }
    } catch (error) {
      console.error("❌ Error fetching event:", error);
    }
  };

  fetchEventById();
  return () => {
    ignore = true;
  };
}, [eventId]);


  // ✅ Handle input changes (nested safe updates)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        let nested = { ...prev };
        let ref = nested;
        for (let i = 0; i < keys.length - 1; i++) {
          ref[keys[i]] = { ...ref[keys[i]] };
          ref = ref[keys[i]];
        }
        ref[keys[keys.length - 1]] = value;
        return nested;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Minimum validation
    if (!formData.eventName || !formData.eventType || !formData.clientId || !formData.eventDate.startDate) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      if (eventId) {
        await api.put(`/v1/events/${eventId}`, formData);
        alert("✅ Event updated successfully");
      } else {
        await api.post("/v1/events", formData);
        alert("✅ Event created successfully");
      }
      navigate("/client-events");
    } catch (error) {
      console.error("❌ Error saving event:", error);
      alert(error.response?.data?.message || "Error saving event");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {eventId ? "Edit Event" : "Create New Event"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Event Name *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            placeholder="Event Type * (wedding, birthday, etc.)"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            placeholder="Client ID *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="datetime-local"
            name="eventDate.startDate"
            value={formData.eventDate.startDate}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Toggle Optional */}
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center gap-2 text-pink-600 font-semibold mt-4"
        >
          {showOptional ? (
            <>
              <FaChevronUp /> Hide Optional Fields
            </>
          ) : (
            <>
              <FaChevronDown /> Show Optional Fields
            </>
          )}
        </button>

        {/* Optional Fields */}
        {showOptional && (
          <div className="space-y-3 border-t pt-4 mt-2">
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="border p-2 rounded-md w-full"
            />
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              placeholder="Client Email"
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              placeholder="Client Phone"
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="assignedPhotographer"
              value={formData.assignedPhotographer}
              onChange={handleChange}
              placeholder="Assigned Photographer ID"
              className="border p-2 rounded-md w-full"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event Description"
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              placeholder="Theme"
              className="border p-2 rounded-md w-full"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="color"
                name="colorScheme.primary"
                value={formData.colorScheme.primary}
                onChange={handleChange}
                className="w-full h-10"
              />
              <input
                type="color"
                name="colorScheme.secondary"
                value={formData.colorScheme.secondary}
                onChange={handleChange}
                className="w-full h-10"
              />
              <input
                type="color"
                name="colorScheme.accent"
                value={formData.colorScheme.accent}
                onChange={handleChange}
                className="w-full h-10"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition mt-4"
        >
          {eventId ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventCreatePage;
