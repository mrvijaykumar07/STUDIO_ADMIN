import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utils/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventCreatePage = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const clientsRedux = useSelector((state) => state.clients.list);

  // ---------------- Individual States ----------------
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [assignedPhotographer, setAssignedPhotographer] = useState("");
  const [startDate, setStartDate] = useState(null); // Date object
  const [endDate, setEndDate] = useState(null);     // Date object
  const [venueName, setVenueName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateAddr, setStateAddr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  // ---------------- Select Client ----------------
  const selectClient = (client) => {
    setClientId(client._id);
    setClientName(client.firstName + " " + client.lastName);
    setClientEmail(client.email);
    setClientPhone(client.phone);
    setSearchQuery("");
    setFilteredClients([]);
  };

  // ---------------- Fetch Event in Edit Mode ----------------
  useEffect(() => {
    if (!eventId) return;
    let ignore = false;
    const fetchEventById = async () => {
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
        console.error(err);
      }
    };
    fetchEventById();
    return () => { ignore = true; };
  }, [eventId]);

  // ---------------- Search Filtering ----------------
  useEffect(() => {
    if (!searchQuery) return setFilteredClients([]);
    const lower = searchQuery.toLowerCase();
    const filtered = clientsRedux.filter(
      (client) =>
        client.firstName.toLowerCase().includes(lower) ||
        client.lastName.toLowerCase().includes(lower) ||
        client.email.toLowerCase().includes(lower) ||
        client.phone.includes(lower)
    );
    setFilteredClients(filtered);
  }, [searchQuery, clientsRedux]);

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !eventType || !clientId || !startDate) {
      alert("⚠️ Please fill required fields");
      return;
    }

    // ---------------- Prepare Payload ----------------
    const payload = {
      eventName,
      eventType: eventType.toLowerCase(),
      clientId,
      ...(clientName && { clientName }),
      ...(clientEmail && { clientEmail }),
      ...(clientPhone && { clientPhone }),
      ...(assignedPhotographer && { assignedPhotographer }),
      eventDate: {
        startDate: startDate.toISOString(),
        ...(endDate && { endDate: endDate.toISOString() }),
      },
      venue: {
        ...(venueName && { name: venueName }),
        address: {
          ...(street && { street }),
          ...(city && { city }),
          ...(stateAddr && { state: stateAddr }),
          ...(zipCode && { zipCode }),
          ...(country && { country }),
        },
      },
      ...(description && { description }),
    };

    console.log("Submitting payload:", payload);

    try {
      let res;
      if (eventId) {
        res = await api.put(`/v1/events/${eventId}`, payload);
      } else {
        res = await api.post("/v1/events", payload);
      }

      if (res.data?.success) {
        alert(`✅ Event ${eventId ? "updated" : "created"} successfully!`);
        if (onSuccess) onSuccess();
      } else {
        alert("❌ Something went wrong while saving event.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save event. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white md:px-6 rounded-xl ">
      <h2 className="text-2xl font-bold mb-2">
         Create New Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event Name *"
            className="border p-2 rounded-md w-full text-sm"
          />
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="Event Type *"
            className="border p-2 rounded-md w-full text-sm"
          />
        </div>

        {/* Event Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Choose Start Date"
            className="border p-2 rounded-md w-full cursor-pointer text-sm"
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText="Choose End Date"
            className="border p-2 rounded-md w-full cursor-pointer text-sm"
          />
        </div>

        {/* Client Search + Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Client by name, phone..."
              className="border p-2 rounded-md w-full"
            />
            {filteredClients.length > 0 && (
              <div className="absolute z-50 w-full border rounded-md bg-white max-h-60 overflow-auto">
                {filteredClients.map((client) => (
                  <div
                    key={client._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => selectClient(client)}
                  >
                    {client.firstName} {client.lastName} ({client.phone})
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center justify-center text-gray-500 font-semibold px-2">OR</div>

          <div className="flex-1 relative mt-2 md:mt-0">
            <button
              type="button"
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-left shadow-sm 
                 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 transition flex justify-between items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {clientId
                ? clientsRedux.find((c) => c._id === clientId)?.firstName + " " +
                  clientsRedux.find((c) => c._id === clientId)?.lastName
                : "-- Choose Client --"}
              <span className="ml-2 text-gray-400">▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-56 overflow-auto">
                {clientsRedux.map((client) => (
                  <div
                    key={client._id}
                    className="px-4 py-1 cursor-pointer hover:bg-pink-50 hover:text-pink-600"
                    onClick={() => { selectClient(client); setDropdownOpen(false); }}
                  >
                    {client.firstName} {client.lastName} ({client.phone})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="flex justify-center text-center text-red-600 bg-red-100 border border-red-300 px-3 py-0.5 rounded-md text-sm">
          ⚠️ If the client does not exist, please add new client first.
        </p>

        {/* Venue */}
        <div className="border-t pt-4 mt-4">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        
            <input
              type="text"
              value={assignedPhotographer}
              onChange={(e) => setAssignedPhotographer(e.target.value)}
              placeholder="Assigned Photographer"
              className="border p-2 rounded-md w-full text-sm"
            />
                <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="Venue Name"
              className="border p-2 rounded-md w-full text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              className="border p-2 rounded-md w-full text-sm"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border p-2 rounded-md w-full text-sm"
            />
            <input
              type="text"
              value={stateAddr}
              onChange={(e) => setStateAddr(e.target.value)}
              placeholder="State (optional)"
              className="border p-2 rounded-md w-full text-sm"
            />
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zip Code (optional)"
              className="border p-2 rounded-md w-full text-sm"
            />
          </div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country (optional)"
            className="border p-2 rounded-md w-full text-sm mt-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            className="border p-2 rounded-md w-full mt-3"
          />
        </div>

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
