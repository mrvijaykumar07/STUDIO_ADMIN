import React, { useState } from "react";
import { FaSearch, FaPlus, FaClipboardList, FaList, FaChartBar } from "react-icons/fa";

const leadsData = [
  {
    id: 1,
    name: "Priya & Raj Kumar",
    type: "Wedding",
    date: "Sep 15, 2025",
    budget: "₹150,000",
    status: "Contacted",
    priority: "high",
  },
  {
    id: 2,
    name: "Sharma Family Anniversary",
    type: "Anniversary",
    date: "Aug 25, 2025",
    budget: "₹50,000",
    status: "Negotiation",
    priority: "high",
  },
  {
    id: 3,
    name: "Aisha & Dev Pre-wedding",
    type: "Pre-wedding",
    date: "Oct 10, 2025",
    budget: "₹80,000",
    status: "Confirmed",
    priority: "medium",
  },
];

const statuses = [
  { name: "Contacted", color: "bg-blue-600" },
  { name: "Negotiation", color: "bg-yellow-400" },
  { name: "Confirmed", color: "bg-green-600" },
  { name: "Lost", color: "bg-red-600" },
];

const LeadManagementPage = () => {
  const [view, setView] = useState("pipeline");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter leads by search term
  const filteredLeads = leadsData.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count leads by status for analytics
  const countByStatus = statuses.reduce((acc, status) => {
    acc[status.name] = leadsData.filter((lead) => lead.status === status.name).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <header>
        <h1 className="md:text-3xl text-2xl font-extrabold text-gray-900">Lead Management</h1>
        <p className="text-gray-600 mt-1">Manage your photography inquiries</p>
      </header>

      {/* Quick Add and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition">
          <FaPlus />  Add New Lead
        </button>

        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
          />
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-6 text-gray-700 font-semibold border-b border-gray-300 mb-6">
        <button
          onClick={() => setView("pipeline")}
          className={`flex items-center gap-2 pb-2 ${
            view === "pipeline" ? "border-b-4 border-pink-600 text-pink-600" : "hover:text-pink-600"
          }`}
        >
          <FaClipboardList /> Pipeline View
        </button>
        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-2 pb-2 ${
            view === "list" ? "border-b-4 border-pink-600 text-pink-600" : "hover:text-pink-600"
          }`}
        >
          <FaList /> List View
        </button>
        <button
          onClick={() => setView("analytics")}
          className={`flex items-center gap-2 pb-2 ${
            view === "analytics" ? "border-b-4 border-pink-600 text-pink-600" : "hover:text-pink-600"
          }`}
        >
          <FaChartBar /> Analytics
        </button>
      </div>

      {/* Content based on view */}
      {view === "pipeline" && (
        <div className="space-y-4">
          {filteredLeads.length === 0 && <p className="text-gray-500 italic">No leads found</p>}
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{lead.name}</p>
                <p className="text-gray-500 text-sm">{lead.type}</p>
                <p className="text-gray-500 text-sm">{lead.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{lead.budget}</p>
                <p className="text-gray-500 text-sm capitalize">{lead.priority} priority</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "list" && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Lead Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-right">Budget</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500 italic">
                    No leads found
                  </td>
                </tr>
              )}
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b last:border-b-0 hover:bg-pink-50">
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.type}</td>
                  <td className="px-4 py-2">{lead.date}</td>
                  <td className="px-4 py-2 text-right">{lead.budget}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                  <td className="px-4 py-2 capitalize">{lead.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "analytics" && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-2xl font-semibold">Leads by Status</h2>
          <div className="space-y-4">
            {statuses.map(({ name, color }) => {
              const count = countByStatus[name] || 0;
              return (
                <div key={name} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full ${color}`}></div>
                  <span className="flex-1 font-semibold">{name}</span>
                  <span className="text-gray-700 font-bold">{count}</span>
                  <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div
                      className={color}
                      style={{
                        width: `${(count / leadsData.length) * 100}%`,
                        transition: "width 0.3s",
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagementPage;
