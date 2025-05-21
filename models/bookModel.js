const db = require("./db");

exports.createBook = async (title, author, genre) => {
  const result = await db.query(
    "INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *",
    [title, author, genre]
  );
  return result.rows[0];
};

exports.getBooks = async (limit, offset, author, genre) => {
  let baseQuery =
    "SELECT id, title, author, genre, TO_CHAR(created_at, 'YYYY/MM/DD HH12:MI:SS AM') AS created_at FROM books";
  const values = [];
  let conditions = [];

  if (author) {
    values.push(`%${author}%`);
    conditions.push(`author ILIKE $${values.length}`);
  }
  if (genre) {
    values.push(`%${genre}%`);
    conditions.push(`genre ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  baseQuery += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const result = await db.query(baseQuery, values);
  return result.rows;
};

exports.getBooksCount = async (author, genre) => {
  let baseQuery = "SELECT COUNT(*) FROM books";
  const values = [];
  const conditions = [];

  if (author) {
    values.push(`%${author}%`);
    conditions.push(`author ILIKE $${values.length}`);
  }
  if (genre) {
    values.push(`%${genre}%`);
    conditions.push(`genre ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  const result = await db.query(baseQuery, values);
  return parseInt(result.rows[0].count, 10);
};

exports.getBookById = async (id) => {
  const bookResult = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return bookResult.rows[0];
};

exports.searchBooks = async (query) => {
  const result = await db.query(
    `SELECT * FROM books 
     WHERE title LIKE $1 OR author LIKE $1`,
    [`%${query}%`]
  );
  return result.rows;
};
