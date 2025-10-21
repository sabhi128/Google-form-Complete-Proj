const EventRegistrationTemplate = {
    title: "Event Registration",
    questions: [
    { type: "Short answer", label: "Full Name", placeholder: "Full Name" },
    { type: "Short answer", label: "Email", placeholder: "Email" },
    { type: "Date", label: "Preferred Date", placeholder: "Preferred Date" },
    { type: "Time", label: "Preferred Time", placeholder: "Preferred Time" },
    { type: "Checkboxes", label: "Topics of interest", placeholder: "Topics of interest", options: ["Ai", "Web Dev", "Design", "Marketing"] },
]};

export default EventRegistrationTemplate;
