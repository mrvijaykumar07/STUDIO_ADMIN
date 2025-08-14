import React from "react";
import { FaQrcode, FaLink, FaEye, FaDownload, FaPlus } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import mrg1 from "../assets/images/mrg/mrg1.jpeg";
import mrg2 from "../assets/images/mrg/mrg2.jpeg";
import mrg3 from "../assets/images/mrg/mrg3.jpeg";
const QRPhotoSharingPage = () => {
  const albums = [
    {
      title: "Sharma Wedding",
      subtitle: "Priya & Raj Sharma",
      photos: 156,
      date: "8/15/2025",
      views: 42,
      downloads: 18,
      access: "Private",
      downloadsEnabled: true,
      qrActive: true,
      expires: "9/20/2025",
      cover: mrg1,
    },
    {
      title: "Gupta Anniversary",
      subtitle: "Raj & Sunita Gupta",
      photos: 89,
      date: "8/10/2025",
      views: 28,
      downloads: 0,
      access: "Public",
      downloadsEnabled: false,
      qrActive: true,
      expires: "9/15/2025",
      cover: mrg2,
    },
    {
      title: "Kumar Pre-wedding",
      subtitle: "Aisha & Dev Kumar",
      photos: 0,
      date: "8/20/2025",
      views: 0,
      downloads: 0,
      access: "Private",
      downloadsEnabled: true,
      qrActive: false,
      expires: "9/10/2025",
      cover: mrg3,
    },
  ];

  const stats = [
    { label: "Total Albums", value: albums.length },
    { label: "Total Views", value: albums.reduce((a, b) => a + b.views, 0) },
    {
      label: "Total Downloads",
      value: albums.reduce((a, b) => a + b.downloads, 0),
    },
    {
      label: "Active QR Codes",
      value: albums.filter((a) => a.qrActive).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="md:flex  items-center justify-between">
        <div>
          <h1 className="md:text-3xl text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaQrcode className="text-pink-600" /> QR Photo Sharing
          </h1>
          <p className="text-gray-600 mt-1 ">
            Create branded photo albums with QR code access
          </p>
        </div>
        <button className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-lg shadow hover:bg-pink-700 transition">
          <FaPlus /> Create Album
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-4 text-center border hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Album List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {albums.map((album, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden border border-gray-100 w-[320px]"
          >
            {/* Image with black gradient text background */}
            <div className="relative group overflow-hidden">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
              />
              {/* Full bottom black gradient for text visibility */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                <h2 className="text-lg font-semibold text-white">
                  {album.title}
                </h2>
                <p className="text-sm text-gray-200">{album.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-500">
                {album.photos} photos • {album.date}
              </p>

              {/* Analytics */}
              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaEye className="text-blue-500" /> {album.views}
                </span>
                <span className="flex items-center gap-1">
                  <FaDownload className="text-green-500" /> {album.downloads}
                </span>
              </div>

              {/* Access Info */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    album.access === "Private"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {album.access}
                </span>
                {album.downloadsEnabled && (
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    Downloads enabled
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    album.qrActive
                      ? "bg-purple-100 text-purple-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {album.qrActive ? "QR Active" : "QR Expired"}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1 text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-200 transition">
                  <FaLink /> Copy Link
                </button>
                <button className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition">
                  <MdOutlinePreview /> Preview
                </button>
                {album.qrActive && (
                  <button className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition">
                    <FaQrcode /> Download QR
                  </button>
                )}
              </div>

              {/* Expiry */}
              <p className="text-xs text-gray-400 mt-3">
                Expires: {album.expires}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRPhotoSharingPage;
