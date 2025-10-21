import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Form1 from "./Components/Form1";
import Sidebar from "./Components/Sidebar";
import TemplateModal from "./Components/Template";
import Responses from "./Components/Responses";
import EmployeeFeedback from "./Components/Preview/EmpFDB";
import JobApplication from "./Components/Preview/JobApp";
import EventFeedback from "./Components/Preview/EventFDB";
import CourseEvaluation from "./Components/Preview/CourseEVL";
import CustomerSatisfaction from "./Components/Preview/CustmrSatf";
import Quiz from "./Components/Preview/Quiz";
import EventRegister from "./Components/Preview/EventReg";
import LeadCapture from "./Components/Preview/LeadCapture";
import RSVP from "./Components/Preview/RSVP";
import BugReport from "./Components/Preview/BugReport";
import Forms from "./Components/Forms";
import { templateMap } from "./Components/FormsTemplates";
import usePersistentState from "./hooks/usePersistentState";
import { cleanupLocalStorage } from "./utils/localStorageCleanup";

// Login & Signup Pages
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  const navigate = useNavigate();

  // Cleanup on mount
  useEffect(() => {
    cleanupLocalStorage();
  }, []);

  const [showPreview, setShowPreview] = usePersistentState("showPreview", false);
  const [showTemplates, setShowTemplates] = usePersistentState("showTemplates", false);
  const [currentView, setCurrentView] = usePersistentState("currentView", "builder");
  const [selectedTemplate, setSelectedTemplate] = usePersistentState("selectedTemplate", null);
  const [forms, setForms] = usePersistentState("forms", []);
  const [selectedQuestion, setSelectedQuestion] = usePersistentState("selectedQuestion", null);
  const [backendError, setBackendError] = useState(null);
  const addSectionRef = useRef(null);

  // 🔐 Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login", { replace: true }); // 🔥 Redirect instantly
  };

  // Protected Route
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  // Auth Redirect (prevents logged-in users from seeing login/signup)
  const AuthRedirect = ({ children }) => {
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  };

  // Fetch forms from backend
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch("/api/forms");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) setForms(data);
        else setForms([]);
      } catch (error) {
        console.error("Failed to fetch forms:", error);
        setBackendError("Unable to connect to backend server. Working in offline mode.");
      }
    };
    fetchForms();
  }, []);

  // Save form to backend
  const saveFormsToBackend = async (formData) => {
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Failed to save form: ${res.status}`);
      console.log("Form saved successfully");
    } catch (err) {
      console.error("Error saving form:", err);
    }
  };

  // AI Suggest
  const handleAiSuggest = () => {
    const aiQuestions = [
      "How satisfied are you overall?",
      "What did you like the most?",
      "What can we improve?",
      "How likely are you to recommend us?",
      "Any additional comments?",
    ];

    const newForms = aiQuestions.map((q) => ({
      id: Date.now() + Math.random(),
      type: "Ai Suggest",
      placeholder: q,
    }));

    setForms((prev) => [...prev, ...newForms]);
  };

  return (
    <Routes>
      {/* Protected Main Page */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
              <Navbar
                onPreviewClick={() => setShowPreview(true)}
                currentView={currentView}
                setCurrentView={setCurrentView}
                selectedTemplate={selectedTemplate}
                onLogout={handleLogout} // ✅ Added
              />

              <div className="flex flex-col lg:flex-row bg-base-100 text-base-content min-h-screen transition-colors duration-300">
                {/* Main Content */}
                <div className="flex-1 order-1 lg:order-none overflow-y-auto max-h-screen scrollbar-none px-4 sm:px-6 lg:px-10 py-6">
                  {backendError && (
                    <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                      <strong>Warning:</strong> {backendError}
                    </div>
                  )}
                  {currentView === "builder" ? (
                    <div className="max-w-4xl mx-auto w-full">
                      <Form1 onAddSectionFromSidebar={addSectionRef} />
                      <Forms forms={forms} setForms={setForms} />
                    </div>
                  ) : (
                    <Responses />
                  )}
                </div>

                {/* Sidebar */}
                <Sidebar
                  onBrowseTemplatesClick={() => setShowTemplates(true)}
                  onAddSection={() => addSectionRef.current && addSectionRef.current()}
                  onSelectQuestion={(label) =>
                    setForms((prev) => [...prev, { type: label, id: Date.now() }])
                  }
                  onAiSuggestClick={handleAiSuggest}
                />
              </div>

              {/* Template Modal */}
              {showTemplates && (
                <TemplateModal
                  isOpen={showTemplates}
                  onClose={() => setShowTemplates(false)}
                  onSelectTemplate={(templateName) => {
                    setSelectedTemplate(templateName);
                    if (templateMap[templateName]) {
                      const template = templateMap[templateName];
                      const templateForms = template.questions.map((q, i) => ({
                        id: Date.now() + i,
                        type: q.type,
                        placeholder: q.placeholder,
                        label: q.label,
                        options: q.options,
                      }));
                      setForms(templateForms);
                    }
                    setShowTemplates(false);
                  }}
                />
              )}

              {/* Previews */}
              {showPreview && (
                <>
                  {selectedTemplate === "Job Application" && (
                    <JobApplication onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Employee Feedback" && (
                    <EmployeeFeedback onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Event Feedback" && (
                    <EventFeedback onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Course Evaluation" && (
                    <CourseEvaluation onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Customer Satisfaction (CSAT + NPS)" && (
                    <CustomerSatisfaction onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Quiz (Multiple Choice)" && (
                    <Quiz onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Event Registration" && (
                    <EventRegister onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Lead Capture" && (
                    <LeadCapture onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "RSVP" && (
                    <RSVP onClose={() => setShowPreview(false)} />
                  )}
                  {selectedTemplate === "Bug Report" && (
                    <BugReport onClose={() => setShowPreview(false)} />
                  )}
                  {!selectedTemplate && (
                    <EmployeeFeedback onClose={() => setShowPreview(false)} />
                  )}
                </>
              )}
            </div>
          </ProtectedRoute>
        }
      />

      {/* Login & Signup */}
      <Route
        path="/login"
        element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRedirect>
            <Signup />
          </AuthRedirect>
        }
      />
    </Routes>
  );
};

export default App;
