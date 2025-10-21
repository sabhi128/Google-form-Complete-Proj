const express = require('express');
const Response = require('../models/Response');
const Form = require('../models/Form');
const router = express.Router();

// Submit a response to a form
router.post('/:formId', async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    const response = new Response({
      formId: req.params.formId,
      answers: req.body.answers,
    });
    await response.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all responses for a form
router.get('/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
