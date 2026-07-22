// backend/routes/tripRoutes.js
const express = require('express');
const { createTrip, getUserTrips, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply the 'protect' middleware to ensure only logged-in users can access these
router.route('/')
  .post(protect, createTrip)
  .get(protect, getUserTrips);

router.route('/:id')
  .delete(protect, deleteTrip);

module.exports = router;