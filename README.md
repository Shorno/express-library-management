

# 📚 Library Management System

A RESTful API for managing books and borrow operations, built with **Express**, **TypeScript**, and **MongoDB** (via Mongoose).

## 🚀 Features

* Book CRUD operations with validation and unique ISBN constraint
* Borrow books with atomic transactions
* Automatically manage book availability
* Aggregated summary endpoint for borrowed books
* Strong error handling with clear, structured responses
* Mongoose advanced features: schema validation, instance methods, middleware, aggregation

---

## 🛠 Tech Stack

* **Node.js**, **TypeScript**, **Express**
* **MongoDB** with **Mongoose**
* **ts-node-dev** for development


---

## 🧩 Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Shorno/express-library-management.git
   cd express-library-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Crate a `.env` file to the root directory and add your variables:

   ```
   DATABASE_URL=your_mongodb_uri
   PORT=5000
   ```

4. **Run in development**

   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:5000`


## 📖 API Endpoints

### 1. Create a Book

`POST /api/books`

* **Body**: `{ title, author, genre, isbn, description?, copies, available? }`
* **Response**:

  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": { /* Book object */ }
  }
  ```

### 2. Get All Books

`GET /api/books?filter=&sortBy=&sort=&limit=`

* Query params:

    * `filter` (by genre),
    * `sortBy` (e.g., `createdAt`),
    * `sort` (`asc` or `desc`),
    * `limit` (default 10)
* **Response**:

  ```json
  {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [ /* Array of books */ ]
  }
  ```

### 3. Get Book by ID

`GET /api/books/:bookId`
**Response**:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { /* Book object */ }
}
```

### 4. Update Book

`PUT /api/books/:bookId`

* **Body**: partial updates (e.g., `{ copies: 50 }`)
* **Response**:

  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": { /* Updated book object */ }
  }
  ```

### 5. Delete Book

`DELETE /api/books/:bookId`

* **Response**:

  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": null
  }
  ```

### 6. Borrow a Book

`POST /api/borrow`

* **Body**: `{ book: "<bookId>", quantity: 2, dueDate: "2025-07-18T00:00:00.000Z" }`
* **Response**:

  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": { /* Borrow record */ }
  }
  ```

### 7. Borrowed Books Summary

`GET /api/borrow`

* Returns total borrow count per book using MongoDB aggregation
* **Response**:

  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": { "title": "The Theory of Everything", "isbn": "9780553380163" },
        "totalQuantity": 5
      },
      ...
    ]
  }
  ```

---

## 💡 Validation & Error Handling

* Schema validation errors (e.g., `copies < 0`) return:

  ```json
  {
    "message": "Validation failed",
    "success": false,
    "error": {
      "name": "ValidationError",
      "errors": { /* field-specific errors */ }
    }
  }
  ```
* Duplicate ISBN errors return a 400 with a clear message.
* Unauthorized or server errors return standardized JSON `{ success: false, message, error }`.

---

## 🗂 Project Structure

```
src/
├─ controllers/    # Request handling logic
├─ models/         # Mongoose schemas/models
├─ routes/         # Express routes
├─ config/         # MongdoDB connection setup
├─ app.ts          # Express app setup
└─ server.ts       # DB start up and server bootstrap
```

---

### Summary of Changes

* Added Mongoose middleware to auto-set `available` flag
* Enforced business logic with `borrowCopies()` method and transactions
* Implemented aggregation endpoint for borrow summaries
* Standardized error responses per requirements

