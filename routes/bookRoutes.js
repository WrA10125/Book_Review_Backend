const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/createbook", authenticate, bookController.createBook);
router.get("/getbooks", authenticate,bookController.getBooks);
router.get("/search",authenticate, bookController.searchBooks);
router.get("/getbooks/:id",authenticate, bookController.getBookById);

module.exports = router;
