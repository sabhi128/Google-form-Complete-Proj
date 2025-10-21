const EmployeeFeedbackTemplate = {
    title: "Employee Feedback",
    description: "Internal company pulse survey",
    questions: [
           { id: Date.now() + Math.random(), type: "Short answer", label: "Employee name", placeholder: "Employee name" },
           { id: Date.now() + Math.random(), type: "Linear scale", label: "Job satisfaction", placeholder: "Job satisfaction" },
           { id: Date.now() + Math.random(), type: "Paragraph", label: "Feedback", placeholder: "Feedback" },
    ]
};

export default EmployeeFeedbackTemplate;
