import React, { useState } from "react";
import {
  FaPlus,
  FaFileContract,
  FaFileAlt,
  FaPenFancy,
  FaRegCheckCircle,
  FaEnvelope,
  FaLock,
  FaHistory,
} from "react-icons/fa";

const contractsData = [
  {
    contractNo: "CONT-2025-001",
    client: "Priya & Raj Sharma",
    eventType: "Wedding",
    status: "signed",
    created: "7/15/2025",
  },
  {
    contractNo: "CONT-2025-002",
    client: "Aisha & Dev Kumar",
    eventType: "Pre-wedding",
    status: "pending",
    created: "8/1/2025",
  },
];

const templatesData = [
  {
    id: 1,
    name: "Wedding Photography Agreement",
    description: "Comprehensive contract for wedding photography services",
    lastModified: "7/1/2025",
    usageCount: 15,
  },
  {
    id: 2,
    name: "Pre-wedding Photography Agreement",
    description: "Contract template for pre-wedding photo sessions",
    lastModified: "6/15/2025",
    usageCount: 8,
  },
  {
    id: 3,
    name: "Corporate Event Agreement",
    description: "Standard contract for corporate photography services",
    lastModified: "5/20/2025",
    usageCount: 5,
  },
];

const digitalSignaturesData = [
  {
    id: 1,
    client: "Priya Sharma",
    agreement: "Wedding Photography Agreement",
    status: "Signed via OTP",
    date: "Jul 20, 2025",
  },
  {
    id: 2,
    client: "Aisha Kumar",
    agreement: "Pre-wedding Agreement",
    status: "Pending signature",
    date: null,
  },
];

const AgreementsPage = () => {
  const [activeTab, setActiveTab] = useState("contracts");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Agreements
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Manage your photography business
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition text-sm md:text-base">
          <FaPlus /> Create Contract
        </button>
      </div>

      {/* Page Title */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold">
          Agreement & Contract Management
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Manage contracts, templates, and digital signatures
        </p>
      </div>

      {/* Tabs */}
      <nav className="flex flex-col sm:flex-row gap-3 sm:gap-8 border-b border-gray-300 text-gray-700 font-semibold">
        {[
          { key: "contracts", icon: <FaFileContract />, label: "Active Contracts" },
          { key: "templates", icon: <FaFileAlt />, label: "Templates" },
          { key: "signatures", icon: <FaPenFancy />, label: "Digital Signatures" },
        ].map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 pb-2 text-sm md:text-base ${
              activeTab === key
                ? "border-b-4 border-pink-600 text-pink-600"
                : "hover:text-pink-600"
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="mt-4">


{/* Active Contracts */}
{activeTab === "contracts" && (
  <>
    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-3 px-4">Contract #</th>
            <th className="py-3 px-4">Client</th>
            <th className="py-3 px-4">Event Type</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Created</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contractsData.map((contract) => (
            <tr
              key={contract.contractNo}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 font-mono">{contract.contractNo}</td>
              <td className="py-3 px-4">{contract.client}</td>
              <td className="py-3 px-4">{contract.eventType}</td>
              <td
                className={`py-3 px-4 font-semibold ${
                  contract.status === "signed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {contract.status}
              </td>
              <td className="py-3 px-4">{contract.created}</td>
              <td className="py-3 px-4 space-x-2">
                <button
                  className="text-pink-600 hover:underline"
                  onClick={() =>
                    alert(`Viewing contract ${contract.contractNo}`)
                  }
                >
                  View
                </button>
                <button
                  className="text-pink-600 hover:underline"
                  onClick={() =>
                    alert(`Editing contract ${contract.contractNo}`)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">
      {contractsData.map((contract) => (
        <div
          key={contract.contractNo}
          className="bg-white shadow-md rounded-lg p-4 space-y-2"
        >
          <p className="font-mono text-sm text-gray-500">
            {contract.contractNo}
          </p>
          <p className="font-bold text-lg">{contract.client}</p>
          <p className="text-gray-700">{contract.eventType}</p>
          <p
            className={`font-semibold ${
              contract.status === "signed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {contract.status}
          </p>
          <p className="text-gray-500 text-sm">Created: {contract.created}</p>
          <div className="flex gap-4 pt-2">
            <button
              className="text-pink-600 hover:underline"
              onClick={() => alert(`Viewing contract ${contract.contractNo}`)}
            >
              View
            </button>
            <button
              className="text-pink-600 hover:underline"
              onClick={() => alert(`Editing contract ${contract.contractNo}`)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
)}



        {/* Templates */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            {templatesData.map((template) => (
              <div
                key={template.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-md"
              >
                <h3 className="font-bold text-base md:text-lg mb-1">
                  {template.name}
                </h3>
                <p className="text-gray-700 text-sm md:text-base mb-1">
                  {template.description}
                </p>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  Last Modified: {template.lastModified}
                </p>
                <p className="text-gray-500 text-xs md:text-sm mb-4">
                  Usage Count: {template.usageCount} times
                </p>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition text-sm md:text-base">
                  Use Template
                </button>
              </div>
            ))}
            <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition text-sm md:text-base">
              <FaPlus /> Create New Template
            </button>
          </div>
        )}

        {/* Digital Signatures */}
        {activeTab === "signatures" && (
          <div className="space-y-6">
            {/* Settings */}
            <section className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-base md:text-lg mb-4">
                Digital Signature Settings
              </h3>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaRegCheckCircle className="text-green-600" />
                    <span>OTP Verification</span>
                  </div>
                  <span className="text-gray-500 italic">Active</span>
                </div>
                <p className="text-gray-500 ml-8 text-xs md:text-sm">
                  Send OTP to client's phone
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-green-600" />
                    <span>Email Verification</span>
                  </div>
                  <span className="text-gray-500 italic">Active</span>
                </div>
                <p className="text-gray-500 ml-8 text-xs md:text-sm">
                  Click-to-sign via email link
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <FaPenFancy className="text-gray-600" />
                    <span>Digital Signature Pad</span>
                  </div>
                  <span className="text-gray-500 italic">Available</span>
                </div>
                <p className="text-gray-500 ml-8 text-xs md:text-sm">
                  Draw signature on device
                </p>
              </div>
            </section>

            {/* Recent Signatures */}
            <section className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-base md:text-lg mb-4">
                Recent Signatures
              </h3>
              <ul className="divide-y divide-gray-200 text-sm md:text-base">
                {digitalSignaturesData.map((sig) => (
                  <li
                    key={sig.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{sig.client}</p>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {sig.agreement}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          sig.status.includes("Pending")
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {sig.status}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {sig.date || ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Legal Compliance */}
            <section className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-3 text-sm md:text-base">
              <h3 className="font-bold text-base md:text-lg">
                Legal Compliance
              </h3>
              <div className="flex items-center gap-2 text-gray-700">
                <FaLock className="text-gray-600" />
                <p>
                  All signed contracts are stored securely for 7 years as per
                  legal requirements
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaHistory className="text-gray-600" />
                <p>
                  Complete signature history with timestamps and IP addresses
                  (audit trail)
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgreementsPage;
