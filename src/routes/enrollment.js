const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Route to enroll a user in a course
router.post('/enroll', enrollmentController.enrollUser);

// Route to get enrolled courses for a user
router.get('/enrolled-courses/:userId', enrollmentController.getEnrolledCourses);

// Route to get students enrolled in a course
router.get('/enrolled-students/:courseId', enrollmentController.getEnrolledStudents);

module.exports = router;
