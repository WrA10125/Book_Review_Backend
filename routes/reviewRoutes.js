const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/books/:id/reviews", authenticate, reviewController.createReview);
router.put("/updatebooks/:id", authenticate, reviewController.updateReview);
router.delete("/deletebooks/:id", authenticate, reviewController.deleteReview);

module.exports = router;
