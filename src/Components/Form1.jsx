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
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={captcha} onChange={() => setCaptcha(!captcha)} />
          <span>Captcha</span>
        </label>

        <label className="flex items-center gap-1">
          <input type="checkbox" checked={shuffleQs} onChange={() => setShuffleQs(!shuffleQs)} />
          <span>Shuffle Qs</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={shuffleOptions}
            onChange={() => setShuffleOptions(!shuffleOptions)}
          />
          <span>Shuffle options</span>
        </label>

        <label className="flex items-center gap-1">
          <span>Quota</span>
          <input
            type="number"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className="w-16 px-2 border rounded"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex-1 min-w-[200px]">
          Open at
          <input
            type="datetime-local"
            value={openAt}
            onChange={(e) => setOpenAt(e.target.value)}
            className="w-full px-2 py-1 mt-1 border rounded"
          />
        </label>

        <label className="flex-1 min-w-[200px]">
          Close at
          <input
            type="datetime-local"
            value={closeAt}
            onChange={(e) => setCloseAt(e.target.value)}
            className="w-full px-2 py-1 mt-1 border rounded"
          />
        </label>

        <label className="flex items-center gap-1">
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

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => alert("Basics clicked")}
          className="flex-1 px-4 py-2 border rounded hover:bg-gray-100"
        >
          Basics
        </button>
        <button
          onClick={() => alert("Details clicked")}
          className="flex-1 px-4 py-2 border rounded hover:bg-gray-100"
        >
          Details
        </button>
        <button
          onClick={handleAddSection}
          className="flex-1 px-4 py-2 border rounded hover:bg-gray-100"
        >
          Add section
        </button>
        <button
          onClick={handleRemoveSection}
          className="flex-1 px-4 py-2 text-red-500 border rounded hover:bg-red-50"
        >
          Remove section
        </button>
      </div>
    </div>
  );
}