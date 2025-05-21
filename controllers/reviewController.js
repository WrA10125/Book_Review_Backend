const reviewModel = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    const hasReviewed = await reviewModel.userHasReviewed(userId, bookId);
    if (hasReviewed)
      return res
        .status(400)
        .json({ message: "You already reviewed this book" });

    const review = await reviewModel.createReview(
      userId,
      bookId,
      rating,
      comment
    );
    res.status(201).json(review);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create review", details: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const existingReview = await reviewModel.getReviewById(reviewId);
    if (!existingReview)
      return res.status(404).json({ message: "Review not found" });
    if (existingReview.user_id !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const updatedReview = await reviewModel.updateReview(
      reviewId,
      rating,
      comment
    );
    res.json(updatedReview);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update review", details: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const existingReview = await reviewModel.getReviewById(reviewId);
    if (!existingReview)
      return res.status(404).json({ message: "Review not found" });
    if (existingReview.user_id !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await reviewModel.deleteReview(reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete review", details: err.message });
  }
};
