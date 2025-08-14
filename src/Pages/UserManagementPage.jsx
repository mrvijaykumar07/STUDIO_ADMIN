import React, { useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@studiobandhan.com",
    role: "Admin",
    department: "Management",
    status: "active",
    lastLogin: "8/11/2025",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@studiobandhan.com",
    role: "Photographer",
    department: "Photography",
    status: "active",
    lastLogin: "8/10/2025",
  },
  {
    id: 3,
    name: "Amit Gupta",
    email: "amit@studiobandhan.com",
    role: "Editor",
    department: "Post-Production",
    status: "active",
    lastLogin: "8/9/2025",
  },
  {
    id: 4,
    name: "Sunita Patel",
    email: "sunita@studiobandhan.com",
    role: "Sales",
    department: "Sales",
    status: "inactive",
    lastLogin: "8/5/2025",
  },
];

const rolesPermissions = [
  {
    role: "Admin",
    description: "Full system access and user management",
    permissions: ["all"],
  },
  {
    role: "Editor",
    description: "Photo editing and album creation access",
    permissions: ["photos", "clients"],
  },
  {
    role: "Sales",
    description: "Photographer access to shoots, clients, and photo management",
    permissions: ["leads", "clients", "photos", "analytics"],
  },
  {
    role: "Lead management",
    description: "Lead management and payment tracking",
    permissions: ["leads", "clients", "payments"],
  },
];

const activityLog = [
  {
    id: 1,
    user: "Rajesh Kumar",
    action: "created new lead for Sharma Wedding",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Priya Sharma",
    action: "uploaded 45 photos to Kumar Album",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Amit Gupta",
    action: "signed in from new device",
    time: "1 day ago",
  },
];

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <header>
        <h1 className="md:text-3xl text-2xl font-extrabold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage your photography business</p>
      </header>

      {/* Action Buttons */}
      <div>
        <button className="bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition">
          + Add User
        </button>
      </div>

      {/* Tabs */}
      <nav className="flex gap-8 border-b border-gray-300 text-gray-700 font-semibold">
        <button
          onClick={() => setActiveTab("team")}
          className={`pb-2 ${
            activeTab === "team"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          Team Members
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`pb-2 ${
            activeTab === "roles"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`pb-2 ${
            activeTab === "activity"
              ? "border-b-4 border-pink-600 text-pink-600"
              : "hover:text-pink-600"
          }`}
        >
          Activity Log
        </button>
      </nav>

      {/* Content */}
      <div className="mt-6">
        {/* Team Members Tab */}
        {activeTab === "team" && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md p-4">
              <table className="min-w-full table-auto text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Login</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-semibold">{member.name}</td>
                      <td className="py-3 px-4 font-mono">{member.email}</td>
                      <td className="py-3 px-4">{member.role}</td>
                      <td className="py-3 px-4">{member.department}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          member.status === "active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {member.status}
                      </td>
                      <td className="py-3 px-4">{member.lastLogin}</td>
                      <td className="py-3 px-4 text-pink-600 cursor-pointer hover:underline">
                        Manage
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md p-4 space-y-2"
                >
                  <p className="font-semibold text-lg">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p>
                    <span className="font-semibold">Role:</span> {member.role}
                  </p>
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {member.department}
                  </p>
                  <p
                    className={`font-semibold ${
                      member.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {member.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last Login: {member.lastLogin}
                  </p>
                  <button className="mt-2 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Roles & Permissions Tab */}
        {activeTab === "roles" && (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            {rolesPermissions.map((role, idx) => (
              <div key={idx} className="border-b border-gray-300 pb-4 last:border-0">
                <h3 className="text-xl font-semibold mb-1">{role.role}</h3>
                <p className="text-gray-700 mb-2">{role.description}</p>
                <p>
                  <span className="font-semibold">Permissions:</span>{" "}
                  {role.permissions.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Activity Log Tab */}
        {activeTab === "activity" && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {activityLog.map((log) => (
              <div
                key={log.id}
                className="border-b border-gray-300 pb-2 last:border-0 text-gray-700"
              >
                <p>
                  <span className="font-semibold">{log.user}</span> {log.action}
                </p>
                <p className="text-gray-400 text-sm">{log.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
