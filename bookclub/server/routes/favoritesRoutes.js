// routes/favoritesRoutes.js
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have authentication middleware

// Protect the route with authentication middleware
router.use(authMiddleware);

// Route to add a favorite
router.post('/addFavorite', favoritesController.addFavorite);

module.exports = router;
