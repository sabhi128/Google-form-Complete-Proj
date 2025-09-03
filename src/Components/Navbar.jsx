import React from "react";
import { FiDownload, FiShare2, FiEye, FiUpload } from "react-icons/fi";
import { HiOutlineClock, HiOutlineRefresh } from "react-icons/hi";

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-800 rounded">
          U
        </div>
        <h1 className="text-lg font-semibold">Ultra Survey</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <button className="p-2 rounded hover:bg-gray-100">
          <HiOutlineClock size={20} />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <HiOutlineRefresh size={20} />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          🌙
        </button>

        <button className="flex-1 w-full sm:w-auto flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiDownload /> CSV
        </button>
        <button className="flex-1 w-full sm:w-auto flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiDownload /> JSON
        </button>
        <button className="flex-1 w-full sm:w-auto flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiUpload /> Import
        </button>

        <button className="flex-1 w-full sm:w-auto flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
          <FiShare2 /> Share link
        </button>
        <button className="flex-1 w-full sm:w-auto px-3 py-1 border rounded hover:bg-gray-100">
          Load link
        </button>
        <button 
          onClick={() => setCurrentView('builder')}
          className={`flex-1 w-full sm:w-auto px-3 py-1 border rounded hover:bg-gray-100 ${
            currentView === 'builder' ? 'bg-blue-100 text-blue-800' : ''
          }`}
        >
          Builder
        </button>
        <button 
          onClick={() => setCurrentView('responses')}
          className={`flex-1 w-full sm:w-auto px-3 py-1 border rounded hover:bg-gray-100 ${
            currentView === 'responses' ? 'bg-blue-100 text-blue-800' : ''
          }`}
        >
          Responses
        </button>
        <button className="flex-1 w-full sm:w-auto px-3 py-1 text-white bg-blue-800 rounded hover:bg-blue-700">
          Preview
        </button>
      </div>
    </div>
  );
}