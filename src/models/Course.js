const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  displayPicture: {
    type: String,
    required: false,
  },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }],
});

module.exports = mongoose.model('Course', CourseSchema);
