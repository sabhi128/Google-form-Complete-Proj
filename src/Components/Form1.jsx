import React, { useState } from "react";

export default function Form1() {
  const [quota, setQuota] = useState(0);
  const [quiz, setQuiz] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [shuffleQs, setShuffleQs] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [openAt, setOpenAt] = useState("");
  const [closeAt, setCloseAt] = useState("");
  const [accent, setAccent] = useState("#4f46e5");
  const [description, setDescription] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("Thanks for your response!");

  // New state to hold dynamic sections
  const [sections, setSections] = useState([]);

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(), // unique id
      title: `New Section`,
      content: ""
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  return (
    <div className="max-w-4xl p-6 mt-10 ml-20 mr-auto bg-white shadow-md ml pace-y-4 m rounded-3xl">
      {/* Form Controls */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={quiz} onChange={() => setQuiz(!quiz)} />
          <span>Quiz</span>
        </label>
        <label className="flex items-center space-x-1">
          <span>Quota</span>
          <input type="number" value={quota} onChange={(e) => setQuota(e.target.value)} className="w-20 px-2 border rounded" />
        </label>
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={captcha} onChange={() => setCaptcha(!captcha)} />
          <span>Captcha</span>
        </label>
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={shuffleQs} onChange={() => setShuffleQs(!shuffleQs)} />
          <span>Shuffle Qs</span>
        </label>
        <label className="flex items-center space-x-1">
          <input type="checkbox" checked={shuffleOptions} onChange={() => setShuffleOptions(!shuffleOptions)} />
          <span>Shuffle options</span>
        </label>

      </div>

      <div className="flex items-center space-x-4">
        <label>
          Open atF
          <input type="datetime-local" value={openAt} onChange={(e) => setOpenAt(e.target.value)} className="px-2 py-1 ml-1 border rounded" />
        </label>
        <label>
          Close at
          <input type="datetime-local" value={closeAt} onChange={(e) => setCloseAt(e.target.value)} className="px-2 py-1 ml-1 border rounded" />
        </label>
        <label className="flex items-center space-x-1">
          <span>Accent</span>
          <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-10 h-8 p-0 border rounded" />
        </label>
      </div>

      <div>
        <label className="block mb-1">Form description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your form (optional)" className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-1">Thank-you message</label>
        <input type="text" value={thankYouMessage} onChange={(e) => setThankYouMessage(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      {/* Section Buttons */}
      <div className="flex space-x-2">
        <button onClick={handleAddSection} className="px-4 py-2 border rounded hover:bg-gray-100">Add section</button>
      </div>

      {/* Dynamic Sections */}
      <div className="mt-4 space-y-4">
        {sections.map(section => (
          <div key={section.id} className="relative p-4 border rounded bg-gray-50">
            <h3 className="font-semibold">{section.title}</h3>
            <textarea
              placeholder="Drag items here from the right to start building your form"
              value={section.content}
              onChange={(e) => {
                const updatedSections = sections.map(s => s.id === section.id ? { ...s, content: e.target.value } : s);
                setSections(updatedSections);
              }}
              className="w-full p-2 mt-2 border rounded"
            />
            <button
              onClick={() => handleRemoveSection(section.id)}
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
            >
              Remove Section
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
