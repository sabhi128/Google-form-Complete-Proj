const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  options: [String], // For multiple choice, dropdown, etc.
  required: { type: Boolean, default: false },
}, {
  _id: false // Disable automatic _id generation for subdocuments
});

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to clean up questions data
FormSchema.pre('save', function(next) {
  if (this.questions && Array.isArray(this.questions)) {
    this.questions = this.questions.map(question => {
      // Remove any _id field that might be causing issues
      const cleanQuestion = { ...question };
      delete cleanQuestion._id;
      return cleanQuestion;
    });
  }
  next();
});

module.exports = mongoose.model('Form', FormSchema);
