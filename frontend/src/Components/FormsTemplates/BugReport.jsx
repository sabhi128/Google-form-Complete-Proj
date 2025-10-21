const BugReportTemplate = {
  title: "Bug Report",
  description: "Repro steps + file upload screenshot",
  questions: [
     { type: "Short answer", label: "Title of bug", placeholder: "Summary" },
     { type: "Paragraph", label: "Describe the bug", placeholder: "Steps to reproduce" },
     { type: "Multiple choice", options: ["Blocker", "Critical", "Major", "Minor"], label: "Severity", placeholder: "Severity" },
     { type: "File upload", label: "Screenshot (optional)", placeholder: "Screenshot / recording" },
  ]
};

export default BugReportTemplate;
