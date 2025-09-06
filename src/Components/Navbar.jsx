import React, { useEffect, useRef } from "react";
import { FiDownload, FiShare2, FiUpload } from "react-icons/fi";
import { HiOutlineClock, HiOutlineRefresh } from "react-icons/hi";

export default function Navbar({ currentView, setCurrentView, onPreviewClick }) {
  const fileInputRef = useRef(null);

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

  // CSV download
  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Score", "John Doe,john@example.com,95"].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "Ultra-Survey.csv";
    link.click();
  };

  // JSON download
  const handleDownloadJSON = () => {
    const data = [
      { name: "John Doe", email: "john@example.com", score: 95 },
      { name: "Jane Smith", email: "jane@example.com", score: 88 },
    ];
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Ultra-Survey.json";
    link.click();
  };

  // Import file
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
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

  return (
    <div className="flex items-center justify-between p-4 border-b shadow-md bg-base-100 text-base-content border-base-300">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-800 rounded">
          U
        </div>
        <h1 className="text-lg font-semibold">Ultra Survey</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Desktop buttons */}
        <div className="items-center hidden gap-2 sm:flex">
          <button className="p-2 rounded hover:bg-base-200">
            <HiOutlineClock size={20} />
          </button>
          <button className="p-2 rounded hover:bg-base-200">
            <HiOutlineRefresh size={20} />
          </button>

          {/* Theme toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg
              className="w-8 h-8 fill-current swap-off"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m15.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414M18.364 18.364l1.414-1.414M4.222 4.222l1.414 1.414" />
            </svg>
            <svg
              className="w-8 h-8 fill-current swap-on"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.56-9.56 1 1 0 0 0-.14-1.05A10 10 0 1 0 22 14.05a1 1 0 0 0-.36-1.05z" />
            </svg>
          </label>

          {/* Extra actions */}
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200"
          >
            <FiDownload /> CSV
          </button>
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200"
          >
            <FiDownload /> JSON
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-1 px-3 py-1 border rounded border-base-300 hover:bg-base-200"
          >
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
          <button
            className="px-3 py-1 border rounded border-base-300 hover:bg-base-200"
            onClick={() => alert("No form found in URL.")}
          >
            Load link
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className="sm:hidden dropdown dropdown-end">
          <label tabIndex={0} className="m-1 btn btn-sm">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="shadow dropdown-content menu bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={handleDownloadCSV}>
                <FiDownload /> Download CSV
              </button>
            </li>
            <li>
              <button onClick={handleDownloadJSON}>
                <FiDownload /> Download JSON
              </button>
            </li>
            <li>
              <button onClick={handleImportClick}>
                <FiUpload /> Import
              </button>
            </li>
            <li>
              <button>
                <FiShare2 /> Share link
              </button>
            </li>
            <li>
              <button onClick={() => alert("No form found in URL.")}>
                Load link
              </button>
            </li>
          </ul>
        </div>

        {/* Always visible buttons (both desktop & mobile) */}
        <button
          onClick={() => setCurrentView("builder")}
          className={`px-3 py-1 border rounded border-base-300 hover:bg-base-200 ${currentView === "builder"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              : ""
            }`}
        >
          Builder
        </button>
        <button onClick={() => setCurrentView("responses")} 
        className={`hidden md:inline-block flex-1 w-full sm:w-auto px-3 py-1 border rounded border-base-300 hover:bg-base-200 ${currentView === "responses" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : ""}`} > Responses </button>
        <button
          onClick={onPreviewClick}
          className="px-3 py-1 text-white bg-blue-800 rounded hover:bg-blue-700"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
