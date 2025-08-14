import React, { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Studio info
  const [studioInfo, setStudioInfo] = useState({
    name: "StudioBandhan Photography",
    email: "contact@studiobandhan.com",
    phone: "+91 98765 43210",
    address: "123 Photography Street, Delhi",
    gst: "07AABCS1234F1Z5",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempStudioInfo, setTempStudioInfo] = useState({ ...studioInfo });

  // Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [timeZone, setTimeZone] = useState("Asia/Kolkata (IST)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [whatsappNotif, setWhatsappNotif] = useState(false);

  // Billing
  const currentPlan = {
    name: "Professional",
    price: "2,999/month",
    nextBilling: "Sep 11, 2025",
    leadsThisMonth: 156,
    storageUsed: "2.5GB",
    teamMembers: 4,
  };

  // Edit handlers
  const handleEditClick = () => {
    setTempStudioInfo({ ...studioInfo });
    setEditMode(true);
  };

  const handleCancel = () => {
    setTempStudioInfo({ ...studioInfo });
    setEditMode(false);
  };

  const handleSave = () => {
    setStudioInfo({ ...tempStudioInfo });
    setEditMode(false);
    console.log("Saved studio info:", tempStudioInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Settings 
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your studio preferences and integrations
          </p>
        </div>
        {activeTab === "general" && !editMode && (
          <button
            onClick={handleEditClick}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition w-full sm:w-auto"
          >
            Edit
          </button>
        )}
        {activeTab === "general" && editMode && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </header>

      {/* Tabs */}
      <nav className="flex gap-6 border-b border-gray-300 text-gray-700 font-semibold overflow-x-auto pb-1 w-full">
        {["general", "branding", "notifications",  "billing"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-4 border-pink-600 text-pink-600"
                  : "hover:text-pink-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </nav>

      {/* Content */}
      <div className="space-y-6">
        {/* General Tab */}
        {activeTab === "general" && (
          <>
            {/* Studio Info Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">Studio Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                {Object.keys(tempStudioInfo).map((key) => (
                  <div key={key} className="min-w-0">
                    <label className="font-semibold block mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={tempStudioInfo[key]}
                      onChange={(e) =>
                        setTempStudioInfo({
                          ...tempStudioInfo,
                          [key]: e.target.value,
                        })
                      }
                      readOnly={!editMode}
                      className={`w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base ${
                        editMode
                          ? "bg-white"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4 max-w-full">
              <h2 className="text-lg sm:text-xl font-semibold">
                System Preferences
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="w-5 h-5"
                />
                <span>Enable Dark Mode</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoBackup}
                  onChange={() => setAutoBackup(!autoBackup)}
                  className="w-5 h-5"
                />
                <span>Automatically backup data daily</span>
              </label>
              <div>
                <label className="block font-semibold mb-1">Time Zone</label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>Asia/Kolkata (IST)</option>
                  <option>America/New_York (EST)</option>
                  <option>Europe/London (GMT)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Branding Tab */}
        {activeTab === "branding" && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Branding</h2>
            <p className="text-gray-600">(Branding settings to be added here)</p>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Notification Settings
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={() => setEmailNotif(!emailNotif)}
                className="w-5 h-5"
              />
              <span>Receive updates via email</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsNotif}
                onChange={() => setSmsNotif(!smsNotif)}
                className="w-5 h-5"
              />
              <span>Receive updates via SMS</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappNotif}
                onChange={() => setWhatsappNotif(!whatsappNotif)}
                className="w-5 h-5"
              />
              <span>Receive updates via WhatsApp</span>
            </label>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Billing & Subscription
            </h2>
            <p>
              <span className="font-semibold">Current Plan:</span>{" "}
              {currentPlan.name}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ₹{currentPlan.price}
            </p>
            <p>
              <span className="font-semibold">Next Billing:</span>{" "}
              {currentPlan.nextBilling}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-pink-50 rounded-md p-4 text-center">
                <p className="font-semibold text-pink-600">
                  {currentPlan.leadsThisMonth}
                </p>
                <p>Leads this month</p>
              </div>
              <div className="bg-pink-50 rounded-md p-4 text-center">
                <p className="font-semibold text-pink-600">
                  {currentPlan.storageUsed}
                </p>
                <p>Storage used</p>
              </div>
              <div className="bg-pink-50 rounded-md p-4 text-center">
                <p className="font-semibold text-pink-600">
                  {currentPlan.teamMembers}
                </p>
                <p>Team members</p>
              </div>
            </div>
            <button className="w-full sm:w-auto mt-4 bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition">
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
