import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const JobApplication = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [resume, setResume] = useState(null);
  const [whyWorkHere, setWhyWorkHere] = useState("");

  // Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

  const isFormValid =
    fullName.trim() &&
    validateEmail(email) &&
    validatePhone(phone) &&
    role &&
    resume &&
    whyWorkHere.trim();

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      setResume(null);
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill all required fields correctly.");
      return;
    }
    const formData = { fullName, email, phone, role, resumeName: resume?.name, whyWorkHere };
    console.log("Submitted Application:", formData);
    alert("Application Submitted Successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div
        className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col
                    transition-colors duration-300 ${
                      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
                    }`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center px-4 sm:px-6 py-4 border-b
                        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button
            onClick={onClose}
            className={theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Job Application</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>
            Submit your details to apply.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
            </div>

            {/* Email */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
              {!validateEmail(email) && email && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>
              )}
            </div>

            {/* Phone */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
              {!validatePhone(phone) && phone && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid phone number (10-15 digits).</p>
              )}
            </div>

            {/* Role */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Role you are applying for <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              >
                <option value="">Select...</option>
                <option value="frontend engineer">Frontend Engineer</option>
                <option value="backend engineer">Backend Engineer</option>
                <option value="designer">Designer</option>
                <option value="pm">PM</option>
              </select>
            </div>

            {/* Resume */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full"
                required
              />
              {!resume && (
                <p className="text-red-500 text-sm mt-1">
                  Please upload your resume in PDF format.
                </p>
              )}
            </div>

            {/* Why Work Here */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Why do you want to work here? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={whyWorkHere}
                onChange={(e) => setWhyWorkHere(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl
                        ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
          <span className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-5 py-2 rounded-lg shadow ${
              isFormValid
                ? theme === "dark"
                  ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  : "bg-blue-800 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
