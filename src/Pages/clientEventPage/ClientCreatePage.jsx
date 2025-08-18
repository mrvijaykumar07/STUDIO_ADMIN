import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import api from "../../utils/axios";

const ClientCreatePage = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  // ✅ Default state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    email: "",
    alternatePhone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [showOptional, setShowOptional] = useState(false);

  // ✅ Edit mode data fetch
  useEffect(() => {
    if (!clientId) return;

    let ignore = false;
    const fetchClientById = async () => {
      try {
        const res = await api.get(`/v1/clients/${clientId}`);

        if (!ignore && res.data?.success) {
          const client = res.data.data; // ✅ actual client object

          setFormData({
            firstName: client.firstName || "",
            lastName: client.lastName || "",
            phone: client.phone || "",
            address: {
              street: client.address?.street || "",
              city: client.address?.city || "",
              state: client.address?.state || "",
              zipCode: client.address?.zipCode || "",
              country: client.address?.country || "",
            },
            email: client.email || "",
            alternatePhone: client.alternatePhone || "",
            dateOfBirth: client.dateOfBirth || "",
            gender: client.gender || "",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching client:", error);
      }
    };

    fetchClientById();

    return () => {
      ignore = true;
    };
  }, [clientId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.state ||
      !formData.address.zipCode ||
      !formData.address.country
    ) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      if (clientId) {
        await api.put(`/v1/clients/${clientId}`, formData);
        alert("✅ Client updated successfully");
      } else {
        await api.post("/v1/clients", formData);
        alert("✅ Client created successfully");
      }

      navigate("/client-events");
    } catch (error) {
      console.error("❌ Error saving client:", error);
      alert(error.response?.data?.message || "Error saving client");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {clientId ? "Edit Client" : "Create New Client"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone *"
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Address */}
        <h3 className="text-lg font-semibold mt-4 text-gray-700">Address *</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Street *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="City *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="State *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
            placeholder="Zip Code *"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            placeholder="Country *"
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              placeholder="Alternate Phone"
              className="border p-2 rounded-md w-full"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              placeholder="Date of Birth"
              className="border p-2 rounded-md w-full"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition mt-4"
        >
          {clientId ? "Update Client" : "Create Client"}
        </button>
      </form>
    </div>
  );
};

export default ClientCreatePage;
