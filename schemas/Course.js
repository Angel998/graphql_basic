const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
