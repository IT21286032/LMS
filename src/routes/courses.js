const express = require('express');
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCoursesByInstructorId
} = require('../controllers/courseController');
const multer = require('multer');
const path = require('path');
const auth=require('../middleware/auth')


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// @route    POST api/courses
// @desc     Create a course
// @access   Public
router.post('/',  upload.single('displayPicture'), createCourse);

// @route    GET api/courses
// @desc     Get all courses
// @access   Public
router.get('/', getCourses);

// @route    GET api/courses/:id
// @desc     Get course by ID
// @access   Public
router.get('/:id', getCourse);

// @route    PUT api/courses/:id
// @desc     Update course
// @access   Public
router.put('/:id', upload.single('displayPicture'), updateCourse);

// @route    DELETE api/courses/:id
// @desc     Delete course
// @access   Public
router.delete('/:id', deleteCourse);

// @route   GET api/courses/instructor
// @desc    Get courses by instructor
// @access  Private
router.get('/instructor/:instructorId', auth,getCoursesByInstructorId);


module.exports = router;
