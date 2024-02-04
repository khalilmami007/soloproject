const BooksSchema = require("../models/book.model");

module.exports.addFavorite = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const book = await BooksSchema.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.favorites) {
      return res.status(400).json({ error: "Book is already in favorites" });
    }

    book.favorites = true;
    await book.save();

    res.json({ data: { favorites: true } });
  } catch (error) {
    console.error("Error adding favorite:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
