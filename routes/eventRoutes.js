const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', eventController.getAllEvents);
router.post('/', protect, eventController.createEvent);
router.get('/my-events', protect, eventController.getMyEvents); // Note: this path will be /api/events/my-events due to app.use in server.js

module.exports = router;