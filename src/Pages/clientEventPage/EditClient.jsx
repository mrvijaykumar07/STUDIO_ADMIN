// src/components/EditClient.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/axios";
import { FaArrowLeft } from "react-icons/fa";
const EditClient = ({ clientId, onSuccess, onCancel }) => {
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

  // ---------------- Fetch existing data ----------------
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/v1/clients/${clientId}`);
        if (res.data?.success) {
          const data = res.data.data;
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setPhone(data.phone || "");
          setAlternatePhone(data.alternatePhone || "");
          setEmail(data.email || "");
          setDateOfBirth(data.dateOfBirth || "");
          setGender(data.gender || "");
          setStreet(data.address?.street || "");
          setCity(data.address?.city || "");
          setStateAddr(data.address?.state || "");
          setZipCode(data.address?.zipCode || "");
          setCountry(data.address?.country || "");
        }
      } catch (err) {
        console.error("❌ Error fetching client:", err);
      }
    };
    if (clientId) fetchClient();
  }, [clientId]);

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      phone,
      alternatePhone: alternatePhone || undefined,
      email: email || undefined,
      dateOfBirth: dateOfBirth || undefined,
      gender: gender || undefined,
      address: {
        street,
        city,
        state: stateAddr || undefined,
        zipCode: zipCode || undefined,
        country: country || undefined,
      },
    };

    try {
      const res = await api.put(`/v1/clients/${clientId}`, payload);
      if (res.data?.success) {
        alert("✅ Client updated successfully!");
        if (onSuccess) onSuccess();
      } else {
        alert("❌ Failed to update client.");
      }
    } catch (err) {
      console.error("❌ Error updating client:", err);
      alert("❌ Error updating client. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-transparent flex items-center justify-center z-50 md:static md:flex-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="
            bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto 
            md:rounded-none md:shadow-none md:max-w-none 
            md:fixed md:right-0 md:top-0 md:h-screen md:w-[80vw]
          "
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
    Edit Client
  </h2>

  {/* Right: Update Button */}
  <button
    type="submit"
    form="editClientForm"
    className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
  >
    Update
  </button>

</div>

          {/* Form */}
          <form  id="editClientForm" onSubmit={handleSubmit} className="space-y-4 p-6">
           
      {/* Name */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      First Name *
    </label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Last Name *
    </label>
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
</div>

{/* Contact Info */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Phone *
    </label>
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Alternate Phone (optional)
    </label>
    <input
      type="text"
      value={alternatePhone}
      onChange={(e) => setAlternatePhone(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email (optional)
  </label>
  <input
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="border p-2 rounded-md w-full text-sm"
  />
</div>

{/* Address */}
<h3 className="text-lg font-semibold mt-2 md:mt-4 text-gray-700 hidden md:block">
  Address
</h3>
<div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Street *
    </label>
    <input
      type="text"
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      City *
    </label>
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      State (optional)
    </label>
    <input
      type="text"
      value={stateAddr}
      onChange={(e) => setStateAddr(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Zip Code (optional)
    </label>
    <input
      type="text"
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
      className="border p-2 rounded-md w-full text-sm"
    />
  </div>
</div>


            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
              >
                Update
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

export default EditClient;
