const JobApplicationTemplate = {
    title: "Job Application",
    questions: [
  { type: "Short answer", label: "Full Name", placeholder: "Full Name" },
  { type: "Short answer", label: "Email", placeholder: "Email" },
  { type: "Short answer", label: "Phone", placeholder: "Phone" },
  { options: ["Frontend Engineer", "Backend Engineer", "Designer", "PM"], type: "Multiple choice", label: "Role you are applying for", placeholder: "Role you are applying for" },
  { type: "File Upload", label: "Resume(PDF)", placeholder: "Resume(PDF)" },
  { type: "Paragraph", label: "Why do you want to work here?", placeholder: "Why do you want to work here?" },
]};

export default JobApplicationTemplate;
