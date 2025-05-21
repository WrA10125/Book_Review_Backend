const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
