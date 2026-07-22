// backend/controllers/tripController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// CREATE A TRIP
exports.createTrip = async (req, res) => {
  try {
    // Extract the exact fields defined in your SRS Database Design
    const { destination, budget, days, interests } = req.body;
    
    const trip = await prisma.trip.create({
      data: {
        userId: req.user.id, // Comes from the protect middleware
        destination,
        budget,
        days,
        interests,
      },
    });
    
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error: error.message });
  }
};

// GET ALL TRIPS FOR LOGGED-IN USER
exports.getUserTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }, // Newest trips first
    });
    
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// DELETE A TRIP
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    // First, verify the trip exists and belongs to the requesting user
    const trip = await prisma.trip.findUnique({ where: { id } });
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.userId !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this trip' });
    }

    // Delete the trip
    await prisma.trip.delete({ where: { id } });
    
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error: error.message });
  }
};