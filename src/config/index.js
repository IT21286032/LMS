require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://kajee:2001@clustertsms.bloyqbz.mongodb.net/',
  jwtSecret: process.env.JWT_SECRET || 'mynameisbilla' // Provide a default secret key
};
