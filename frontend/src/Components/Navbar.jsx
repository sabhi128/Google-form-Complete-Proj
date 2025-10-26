import React, { useEffect, useRef, useState, memo } from "react";
import { FiDownload, FiShare2, FiUpload, FiSave } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = memo(function Navbar({
  currentView, setCurrentView, onPreviewClick, selectedTemplate,
  // New props
  forms,
  onSave,
  isSaving,
  saveError,
}) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Watch for token changes to update state
  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    checkAuth();
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Theme toggle
  useEffect(() => {
    const checkbox = document.querySelector(".theme-controller");
    if (checkbox) {
      const saved = localStorage.getItem("theme");
      const initialTheme = saved ? saved : "light";
      document.documentElement.setAttribute("data-theme", initialTheme);
      checkbox.checked = initialTheme === "dark";

      const apply = () => {
        const newTheme = checkbox.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      checkbox.addEventListener("change", apply);
      return () => checkbox.removeEventListener("change", apply);
    }
  }, []);

  // Convert form data to CSV
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";
    const headers = "id,type,placeholder,label";
    const rows = data.map(
      (form) => `${form.id},${form.type},"${form.placeholder || ""}","${form.label || ""}"`
    );
    return [headers, ...rows].join("\n");
  };

  // Download form data as CSV
  const handleDownloadCSV = () => {
    if (!forms || forms.length === 0) {
      alert("No form data to download.");
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(forms);
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${selectedTemplate || "form"}.csv`;
    link.click();
  };

  // Download form data as JSON
  const handleDownloadJSON = () => {
    if (!forms || forms.length === 0) {
      alert("No form data to download.");
      return;
    }
    const blob = new Blob([JSON.stringify(forms, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedTemplate || "form"}.json`;
    link.click();
  };

  // Import file
  const handleImportClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      alert(`Imported file: ${file.name}\n\nContent:\n${event.target.result}`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

 // ✅ Logout handler (final fix)
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");

  // Inform other tabs/components (especially App.js)
  window.dispatchEvent(new Event("storage"));

  setIsLoggedIn(false);

  // Give React time to update before navigation
  setTimeout(() => {
    navigate("/login", { replace: true });
  }, 100);
};
  return (
    <div className="flex items-center justify-between p-4 border-b shadow-md bg-base-100 text-base-content border-base-300">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-800 rounded">
          U
        </div>
        <h1 className="text-lg font-semibold">
          {selectedTemplate || "Ultra Survey"}
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <div className="items-center hidden gap-2 sm:flex">
          <button className="p-2 rounded hover:bg-base-200">
            <HiOutlineRefresh size={20} />
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200 ${
              isSaving ? "cursor-not-allowed opacity-50" : ""
            } ${saveError ? "border-red-500 text-red-500" : ""}`}
            title={saveError || (isSaving ? "Saving..." : "Save to cloud")}
          >
            <FiSave className={isSaving ? "animate-spin" : ""} />
            {isSaving ? "Saving..." : "Save"}
          </button>

          {/* Theme toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg
              className="w-8 h-8 fill-current swap-off"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="w-8 h-8 fill-current swap-on"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* Extra actions */}
          <button onClick={handleDownloadCSV} className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200">
            <FiDownload /> CSV
          </button>
          <button onClick={handleDownloadJSON} className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200">
            <FiDownload /> JSON
          </button>
          <button onClick={handleImportClick} className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200">
            <FiUpload /> Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <button className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200">
            <FiShare2 /> Share link
          </button>

          {/* ✅ Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-500"
            >
              Logout
            </button>
          )}
        </div>

        {/* Builder, Responses, Preview */}
        <button
          onClick={() => setCurrentView("builder")}
          className={`px-3 py-1 border rounded border-base-300 hover:bg-base-200 ${
            currentView === "builder"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              : ""
          }`}
        >
          Builder
        </button>
        <button
          onClick={() => setCurrentView("responses")}
          className={`hidden md:inline-block flex-1 w-full sm:w-auto px-3 py-1 border rounded border-base-300 hover:bg-base-200 ${
            currentView === "responses"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              : ""
          }`}
        >
          Responses
        </button>
        <button
          onClick={onPreviewClick}
          className="px-3 py-1 text-white bg-blue-800 rounded hover:bg-blue-700"
        >
          Preview
        </button>
      </div>
    </div>
  );
});

export default Navbar;
