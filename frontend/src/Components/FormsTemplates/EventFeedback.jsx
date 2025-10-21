const EventFeedbackTemplate = {
  title: "Event Feedback",
  questions: [
    {
  // id removed for MongoDB compatibility
      type: "Short answer",
      label: "Your name",
      placeholder: "Your name"
    },
    {
      id: Date.now() + Math.random(),
      type: "Linear scale",
      label: "Rate the event",
      placeholder: "Rate the event"
    },
    {
      id: Date.now() + Math.random(),
      type: "Multiple choice",
      label: "How did you hear about it?",
      placeholder: "How did you hear about it?",
      options: ["Social Media", "Friends", "Email", "Other"]
    },
    {
      id: Date.now() + Math.random(),
      type: "Paragraph",
      label: "What did you like the most?",
      placeholder: "What did you like the most?"
    },
    {
      id: Date.now() + Math.random(),
      type: "Paragraph",
      label: "What can we improve?",
      placeholder: "What can we improve?"
    }
  ]
};

export default EventFeedbackTemplate;
