import React, { useState } from "react";

export default function Form1() {
  const [quota, setQuota] = useState(0);
  const [captcha, setCaptcha] = useState(false);
  const [shuffleQs, setShuffleQs] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [openAt, setOpenAt] = useState("");
  const [closeAt, setCloseAt] = useState("");
  const [accent, setAccent] = useState("#4f46e5"); 
  const [description, setDescription] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("Thanks for your response!");

  const handleAddSection = () => {
    alert("Add section clicked!");
  };

  const handleRemoveSection = () => {
    alert("Remove section clicked!");
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 space-y-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={captcha} onChange={() => setCaptcha(!captcha)} />
          <span>Captcha</span>
        </label>

        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={shuffleQs} onChange={() => setShuffleQs(!shuffleQs)} />
          <span>Shuffle Qs</span>
        </label>

        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={shuffleOptions}
            onChange={() => setShuffleOptions(!shuffleOptions)}
          />
          <span>Shuffle options</span>
        </label>

        <label className="flex items-center space-x-1">
          <span>Quota</span>
          <input
            type="number"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className="w-16 px-2 border rounded"
          />
        </label>
      </div>

      <div className="flex items-center space-x-4">
        <label>
          Open at
          <input
            type="datetime-local"
            value={openAt}
            onChange={(e) => setOpenAt(e.target.value)}
            className="px-2 py-1 ml-1 border rounded"
          />
        </label>

        <label>
          Close at
          <input
            type="datetime-local"
            value={closeAt}
            onChange={(e) => setCloseAt(e.target.value)}
            className="px-2 py-1 ml-1 border rounded"
          />
        </label>

        <label className="flex items-center space-x-1">
          <span>Accent</span>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-10 h-8 p-0 border rounded"
          />
        </label>
      </div>

      <div>
        <label className="block mb-1">Form description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your form (optional)"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Thank-you message</label>
        <input
          type="text"
          value={thankYouMessage}
          onChange={(e) => setThankYouMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => alert("Basics clicked")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Basics
        </button>
        <button
          onClick={() => alert("Details clicked")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Details
        </button>
        <button
          onClick={handleAddSection}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Add section
        </button>
        <button
          onClick={handleRemoveSection}
          className="px-4 py-2 text-red-500 border rounded hover:bg-red-50"
        >
          Remove section
        </button>
      </div>
    </div>
  );
}
