import React from "react";
import { FiDownload, FiShare2, FiEye, FiUpload } from "react-icons/fi";
import { HiOutlineClock, HiOutlineRefresh } from "react-icons/hi";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-800 rounded">
          U
        </div>
        <h1 className="text-lg font-semibold">Ultra Survey</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded hover:bg-gray-100">
          <HiOutlineClock size={20} />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <HiOutlineRefresh size={20} />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          🌙
        </button>

        <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiDownload /> CSV
        </button>
        <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiDownload /> JSON
        </button>
        <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiUpload /> Import
        </button>

        <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiShare2 /> Share link
        </button>
        <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          Load link
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Builder
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Responses
        </button>
        <button className="px-3 py-1 text-white bg-blue-800 rounded hover:bg-blue-700">
          Preview
        </button>
      </div>
    </div>
  );
}
