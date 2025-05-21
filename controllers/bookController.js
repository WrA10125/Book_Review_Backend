const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({ message: "Title, author, and genre are required" });
    }
    const book = await bookModel.createBook(title, author, genre);
    res.status(201).json(book);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create book", details: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const numericLimit = parseInt(limit);
    const numericPage = parseInt(page);
    const offset = (numericPage - 1) * numericLimit;

    const books = await bookModel.getBooks(numericLimit, offset, author, genre);
    const total = await bookModel.getBooksCount(author, genre);

    res.json({
      data: books,
      page: numericPage,
      limit: numericLimit,
      total,
      totalPages: Math.ceil(total / numericLimit),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get books", details: err.message });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel.getBookById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const averageRating = await reviewModel.getAverageRating(bookId);
    const reviews = await reviewModel.getReviewsByBookId(bookId, 5, 0); // Default first 5 reviews

    res.json({ ...book, averageRating, reviews });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get book details", details: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q)
      return res.status(400).json({ message: "Search query is required" });

    const result = await bookModel.searchBooks(q);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to search books", details: err.message });
  }
};
