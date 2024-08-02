const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.', false));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const jwt = require('jsonwebtoken');

exports.createCourse = async (req, res) => {
  const { title, description, content } = req.body;
  const displayPicture = req.file ? req.file.path : '';
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  //console.log(token,"auth")

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const instructorId = decoded.user.id;

    const newCourse = new Course({
      title,
      description,
      instructor: instructorId,
      content,
      displayPicture,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific course by ID
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  const { title, description, instructor, content, displayPicture } = req.body;

  const courseFields = {};
  if (title) courseFields.title = title;
  if (description) courseFields.description = description;
  if (instructor) courseFields.instructor = instructor;
  if (content) courseFields.content = content;
  if (displayPicture) courseFields.displayPicture = displayPicture;

  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: courseFields },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a course by ID

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Get courses by instructor ID from URL parameter
exports.getCoursesByInstructorId = async (req, res) => {
  try {
    // Extract instructor ID from URL parameters
    const instructorId = req.params.instructorId;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({ msg: 'Invalid instructor ID' });
    }

    // Find courses by instructor ID
    const courses = await Course.find({ instructor: instructorId });

    // Return courses
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};