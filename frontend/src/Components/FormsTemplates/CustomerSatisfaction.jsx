const CustomerSatisfactionTemplate = {
    title: "Customer Satisfaction (CSAT + NPS)",
    description: "NPS, usage questions & comments",
    questions: [
        { type: "Linear scale", minLabel: "Bad", maxLabel: "Great", scale: 5, placeholder: "Overall satisfaction" },
        { type: "Multiple choice", options: ["Daily", "Weekly", "Monthly", "Rarely"], placeholder: "How often do you use the product?" },
            { id: Date.now() + Math.random(), type: "Linear scale", label: "How satisfied are you?", placeholder: "How satisfied are you?" },
            { id: Date.now() + Math.random(), type: "Short answer", label: "Product used", placeholder: "Product used" },
            { id: Date.now() + Math.random(), type: "Paragraph", label: "Comments", placeholder: "Comments" },
        { type: "Paragraph", placeholder: "What do you like most?" },
        { type: "Paragraph", placeholder: "What can we improve?" },
    ]
};

export default CustomerSatisfactionTemplate;
