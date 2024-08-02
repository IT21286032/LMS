require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://kawjevvve:2001vvv@clustertsms.bloyqbz.mongodb.net/',
  jwtSecret: process.env.JWT_SECRET || 'mynameisbvvwilla' // Provide a default secret key
};
