const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// Enroll a user in a course
exports.enrollUser = async (req, res) => {
  const { userId, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid userId or courseId.' });
  }

  try {
    // Check if the user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in this course.' });
    }

    // Create a new enrollment
    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    // Add the enrollment to the course's enrolled students
    await Course.findByIdAndUpdate(courseId, { $push: { enrolledStudents: enrollment._id } });

    res.status(201).json({ message: 'User enrolled successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to enroll user.' });
  }
};

// Get enrolled courses for a user
exports.getEnrolledCourses = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId.' });
  }

  try {
    const enrollments = await Enrollment.find({ userId });
    const courseIds = enrollments.map(enrollment => enrollment.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch enrolled courses.' });
  }
};

// Get students enrolled in a course
exports.getEnrolledStudents = async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid courseId.' });
  }

  try {
    const enrollments = await Enrollment.find({ courseId });
    const userIds = enrollments.map(enrollment => enrollment.userId);

    // Optionally, you could get user details if needed
    const students = await User.find({ _id: { $in: userIds } });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch enrolled students.' });
  }
};
