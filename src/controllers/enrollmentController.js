const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User=require('../models/User')

// Enroll a user in a course
exports.enrollUser = async (req, res) => {
  const { userId, courseId } = req.body;

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
    res.status(500).json({ message: 'Failed to enroll user.' });
  }
};

// Get enrolled courses for a user
exports.getEnrolledCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.find({ userId });
    const courseIds = enrollments.map(enrollment => enrollment.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrolled courses.' });
  }
};

// Get students enrolled in a course
exports.getEnrolledStudents = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({ courseId });
    const userIds = enrollments.map(enrollment => enrollment.userId);

    // Optionally, you could get user details if needed
    res.json(userIds);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrolled students.' });
  }
};
