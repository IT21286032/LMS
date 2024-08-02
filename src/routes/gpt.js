const express = require('express');
const { getRecommendations } = require('../controllers/gptController');
//const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.post('/recommend', getRecommendations);

module.exports = router;
