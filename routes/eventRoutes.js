const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', eventController.getAllEvents);
router.post('/', protect, eventController.createEvent);
router.get('/my-events', protect, eventController.getMyEvents);

module.exports = router;