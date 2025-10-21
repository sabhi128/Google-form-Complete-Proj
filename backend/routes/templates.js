const express = require('express');
const router = express.Router();

// Define form templates as JSON data instead of requiring React components
const templates = {
  'bug-report': {
    title: 'Bug Report Form',
    description: 'Report a bug or issue',
    questions: [
      {
        type: 'short-answer',
        label: 'What is the bug?',
        required: true
      },
      {
        type: 'paragraph',
        label: 'Describe the bug in detail',
        required: true
      },
      {
        type: 'short-answer',
        label: 'Steps to reproduce',
        required: true
      },
      {
        type: 'multiple-choice',
        label: 'Severity',
        options: ['Low', 'Medium', 'High', 'Critical'],
        required: true
      }
    ]
  },
  'course-evaluation': {
    title: 'Course Evaluation',
    description: 'Evaluate your course experience',
    questions: [
      {
        type: 'short-answer',
        label: 'Course Name',
        required: true
      },
      {
        type: 'linear-scale',
        label: 'Overall rating (1-5)',
        required: true
      },
      {
        type: 'paragraph',
        label: 'What did you like about the course?',
        required: false
      },
      {
        type: 'paragraph',
        label: 'What could be improved?',
        required: false
      }
    ]
  },
  'customer-satisfaction': {
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our service',
    questions: [
      {
        type: 'linear-scale',
        label: 'How satisfied are you with our service? (1-5)',
        required: true
      },
      {
        type: 'multiple-choice',
        label: 'How did you hear about us?',
        options: ['Social Media', 'Friend', 'Advertisement', 'Search Engine', 'Other'],
        required: true
      },
      {
        type: 'paragraph',
        label: 'Additional comments',
        required: false
      }
    ]
  },
  'employee-feedback': {
    title: 'Employee Feedback',
    description: 'Share your feedback about the workplace',
    questions: [
      {
        type: 'linear-scale',
        label: 'Job satisfaction (1-5)',
        required: true
      },
      {
        type: 'linear-scale',
        label: 'Work-life balance (1-5)',
        required: true
      },
      {
        type: 'paragraph',
        label: 'What do you like about working here?',
        required: false
      },
      {
        type: 'paragraph',
        label: 'What could be improved?',
        required: false
      }
    ]
  }
};

router.get('/:template', (req, res) => {
  const template = templates[req.params.template];
  if (!template) return res.status(404).json({ error: 'Template not found' });
  res.json(template);
});

// Get all available templates
router.get('/', (req, res) => {
  const templateList = Object.keys(templates).map(key => ({
    id: key,
    title: templates[key].title,
    description: templates[key].description
  }));
  res.json(templateList);
});

module.exports = router;
