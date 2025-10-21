const CourseEvaluationTemplate = {
    title: "Course Evaluation",
    description: "Education-focused feedback for instructors",
    questions: [
           { type: "Linear scale", minLabel: "Poor", maxLabel: "Excellent", scale: 5, label: "Rate the instructor", placeholder: "Rate the instructor" },
           { type: "Linear scale", minLabel: "Weak", maxLabel: "Strong", scale: 5, label: "Rate the course content", placeholder: "Rate the course content" },
           { type: "Paragraph", label: "Most valuable part of the course?", placeholder: "Most valuable part of the course?" },
           { type: "Paragraph", label: "Suggestions for improvement", placeholder: "Suggestions for improvement" },
    ]
};

export default CourseEvaluationTemplate;
