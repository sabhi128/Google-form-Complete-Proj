const RSVPTemplate = {
    title: "RSVP",
    questions: [
    { type: "Multiple choice", label: "Will you attend?", placeholder: "Will you attend?", options: ["Yes", "No", "Maybe"] },
    { type: "Dropdown", label: "Meal preference", placeholder: "Meal preference", options: ["Veg", "Non Veg", "Vegan", "Halal"] },
    { type: "Short answer", label: "Allergies (if any)", placeholder: "Allergies (if any)" },
]};

export default RSVPTemplate;
