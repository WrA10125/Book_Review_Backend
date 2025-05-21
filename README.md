$Book Review API$

A RESTful backend API built with Node.js, Express, PostgreSQL, and JWT Authentication. It allows users to register, log in, and manage book reviews in a secure, scalable way.


$Tech Stack$

Node.js + Express.js,PostgreSQL

JWT for authentication

bcrypt for password hashing

dotenv for configuration

$Features$

🧑‍💻 Authentication
POST /signup – Register a new user

POST /login – Login and get a JWT token


📚 Book Endpoints
POST /createbooks – Add a new book (Authenticated)

GET /getbooks – Get all books (supports pagination + optional filters by author & genre)

GET /getbooks/:id – Get book by ID with average rating and latest reviews

GET /search?q=term – Search books by title or author (case-insensitive)



✍️ Review Endpoints
POST /books/:id/reviews – Submit a review (1 per book per user)

PUT /updatereviews/:id – Update your review

DELETE /deletereviews/:id – Delete your review

 

$Setup Instructions$

1)Clone the repo

git clone https://github.com/your-username/Book_Review_Backend.git
cd Book_Review_Backend

2)Install dependencies
npm install pg jsonwebtoken bcryptjs express dotenv

3)install dev dependencies
npm i --save-dev nodemon


4)Set up environment variables
PORT=3000
DATABASE_URL=postgresql://username:yourpassword@localhost:5432/bookreview_db
JWT_SECRET=your jwt secret

5)Start the server
npm run dev   # if using nodemon
or node server.js

