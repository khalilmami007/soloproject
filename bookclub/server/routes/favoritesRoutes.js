// routes/favoritesRoutes.js
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have authentication middleware

// Protect the route with authentication middleware
router.use(authMiddleware);

// Route to add a favorite
router.post('/addFavorite/:bookId', favoritesController.addFavorite);

// Route to get users who like the same book
router.get('/usersWhoLike/:bookId', favoritesController.usersWhoLike);


module.exports = router;
