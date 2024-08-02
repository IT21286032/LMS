const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'instructor'],
    default: 'student' // Assuming two roles: student and instructor
  }
});

// Pre-save hook to check if email is provided
userSchema.pre('save', function (next) {
  if (!this.email) {
    return next(new Error('Email is required.'));
  }
  next();
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
