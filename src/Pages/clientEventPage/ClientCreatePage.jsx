import React, { useState } from "react";
import api from "../../utils/axios";

const ClientCreatePage = ({ onSuccess }) => {
  // ---------------- Individual States ----------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateAddr, setStateAddr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !street || !city) {
      alert("⚠️ Please fill all required fields");
      return;
    }

const payload = {
  firstName,
  lastName,
  phone,
  alternatePhone: alternatePhone || undefined,
  email: email || undefined,
  dateOfBirth: dateOfBirth || undefined,
  gender: gender || undefined,   // ❌ empty string mat bhejo
  address: {
    street,
    city,
    state: stateAddr || undefined, // ❌ empty string bhejne se schema error aata hai
    zipCode: zipCode || undefined,
    country: country || undefined,
  },
};


    console.log("Submitting payload:", payload);

    try {
      const res = await api.post("/v1/clients", payload);
      if (res.data?.success) {
        alert("✅ Client created successfully!");
        if (onSuccess) onSuccess(); // ✅ parent ko notify karo
      } else {
        alert("❌ Something went wrong while saving client.");
      }
    } catch (error) {
      console.error("❌ Error creating client:", error);
      alert(error.response?.data?.message || "Error creating client");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-2">
      <h2 className="text-2xl font-bold mb-1 text-gray-800">
        Create New Client
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name *"
            className="border p-2 rounded-md w-full text-sm"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name *"
            className="border p-2 rounded-md w-full text-sm"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone *"
            className="border p-2 rounded-md w-full text-sm"
          />
          <input
            type="text"
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
            placeholder="Alternate Phone (optional)"
            className="border p-2 rounded-md w-full text-sm"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className="border p-2 rounded-md w-full text-sm"
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street *"
            className="border p-2 rounded-md w-full text-sm"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City *"
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition mt-2 md:mt-4 w-full md:w-auto"
        >
          Create Client
        </button>
      </form>
    </div>
  );
};

export default ClientCreatePage;
