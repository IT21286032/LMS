const express = require('express');
const { check } = require('express-validator');
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getInstructors
} = require('../controllers/userController');
//const auth = require('../middleware/auth');
const role = require('../middleware/role');
const User = require('../models/User'); // Ensure User model is imported

const router = express.Router();

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('role', 'Role is required').not().isEmpty(),
  ],
  register
);

// @route    POST api/users/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get('/', getUsers);

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Private
router.get('/:id', role(['admin']), getUser);

// @route    PUT api/users/:id
// @desc     Update user
// @access   Private
router.put('/:id', updateUser);

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Private
router.delete('/:id', role(['admin']), deleteUser);

// @route    GET api/users/instructors
// @desc     Get all instructors
// @access   Private (Accessible by all instructors)
router.get('/instructors', role(['instructor']), getInstructors);

module.exports = router;
