const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    default: 'student' 
  }
});

userSchema.pre('save', function (next) {
  if (!this.email) {
    return next(new Error('Email is required.'));
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
