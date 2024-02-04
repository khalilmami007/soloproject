const BooksSchema = require("../models/book.model");
const User = require("../models/auth.model");

module.exports.addFavorite = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);
      const { bookId } = req.params;
      const userId = req.user.id;
  
      console.log('User ID from token:', userId);
  
      const addedByUser = await User.findById(userId);
  
      console.log('Retrieved user:', addedByUser);
  
      const book = await BooksSchema.findById(bookId);
  
      console.log('Retrieved book:', book);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Check if the book is already in favorites
      if (!addedByUser || !book.favorites || !book.favorites.includes(addedByUser._id))  {
        return res.status(400).json({ error: 'Book is already in favorites' });
      }
  
      book.favorites.push(addedByUser._id);
      await book.save();
  
      res.json({ favorites: true }); // Book added to favorites
    } catch (error) {
      console.error('Error adding favorite:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports.usersWhoLike = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Find the book by ID
    const bookWithFavorites = await BooksSchema.findById(bookId);

    // Extract the user details from the 'favorites' field
    const usersWhoLikeTheBook = bookWithFavorites.favorites;

    res.json({ users: usersWhoLikeTheBook });
  } catch (error) {
    console.error('Error fetching users who like the book:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
