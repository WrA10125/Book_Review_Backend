const db = require("./db");

exports.createReview = async (userId, bookId, rating, comment) => {
  const result = await db.query(
    "INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, bookId, rating, comment]
  );
  return result.rows[0];
};

exports.getReviewsByBookId = async (bookId, limit, offset) => {
  const result = await db.query(
    `SELECT r.*, u.name AS reviewer
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.book_id = $1
     ORDER BY r.created_at DESC
     LIMIT $2 OFFSET $3`,
    [bookId, limit, offset]
  );
  return result.rows;
};

exports.getAverageRating = async (bookId) => {
  const result = await db.query(
    "SELECT AVG(rating)::numeric(10,2) AS average FROM reviews WHERE book_id = $1",
    [bookId]
  );
  return result.rows[0].average;
};

exports.getReviewById = async (id) => {
  const result = await db.query("SELECT * FROM reviews WHERE id = $1", [id]);
  return result.rows[0];
};

exports.updateReview = async (id, rating, comment) => {
  const result = await db.query(
    "UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *",
    [rating, comment, id]
  );
  return result.rows[0];
};

exports.deleteReview = async (id) => {
  await db.query("DELETE FROM reviews WHERE id = $1", [id]);
};

exports.userHasReviewed = async (userId, bookId) => {
  const result = await db.query(
    "SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2",
    [userId, bookId]
  );
  return result.rows.length > 0;
};
