# EasyReads API Documentation for Postman

Base URL: `http://localhost:5000/api`

## Collections

All endpoints support the following HTTP methods:
- **GET** - Retrieve data
- **POST** - Create new item
- **PUT** - Update entire item
- **PATCH** - Partial update
- **DELETE** - Delete item

---

## Books Collection

### GET all books
```
GET /api/books
```

### GET book by ID
```
GET /api/books/:id
```

### POST create new book
```
POST /api/books
Content-Type: application/json

{
  "name": "Book Title",
  "ISBN": "978-1234567890",
  "author": "Author Name",
  "image_link": "https://example.com/image.jpg",
  "amazon_link": "https://amazon.com/book"
}
```

### PUT update book
```
PUT /api/books/:id
Content-Type: application/json

{
  "name": "Updated Book Title",
  "ISBN": "978-1234567890",
  "author": "Author Name",
  "image_link": "https://example.com/image.jpg",
  "amazon_link": "https://amazon.com/book"
}
```

### PATCH partial update
```
PATCH /api/books/:id
Content-Type: application/json

{
  "name": "Updated Title Only"
}
```

### DELETE book by ID
```
DELETE /api/books/:id
```

### DELETE all books
```
DELETE /api/books
```

---

## E-Books Collection

### GET all ebooks
```
GET /api/ebooks
```

### GET ebook by ID
```
GET /api/ebooks/:id
```

### POST create new ebook
```
POST /api/ebooks
Content-Type: application/json

{
  "name": "E-Book Title",
  "ISBN": "978-1234567891",
  "author": "Author Name",
  "image_link": "https://example.com/image.jpg",
  "amazon_link": "https://amazon.com/ebook"
}
```

### PUT update ebook
```
PUT /api/ebooks/:id
Content-Type: application/json

{
  "name": "Updated E-Book Title",
  "ISBN": "978-1234567891",
  "author": "Author Name",
  "image_link": "https://example.com/image.jpg",
  "amazon_link": "https://amazon.com/ebook"
}
```

### PATCH partial update
```
PATCH /api/ebooks/:id
Content-Type: application/json

{
  "amazon_link": "https://amazon.com/new-link"
}
```

### DELETE ebook by ID
```
DELETE /api/ebooks/:id
```

### DELETE all ebooks
```
DELETE /api/ebooks
```

---

## Audiobooks Collection

### GET all audiobooks
```
GET /api/audiobooks
```

### GET audiobook by ID
```
GET /api/audiobooks/:id
```

### POST create new audiobook
```
POST /api/audiobooks
Content-Type: application/json

{
  "name": "Audiobook Title",
  "ISBN": "978-1234567892",
  "author": "Author Name",
  "narrator": "Narrator Name",
  "image_link": "https://example.com/image.jpg",
  "amazon_link": "https://amazon.com/audiobook"
}
```

### PUT update audiobook
```
PUT /api/audiobooks/:id
Content-Type: application/json

{
  "name": "Updated Audiobook Title",
  "ISBN": "978-1234567892",
  "author": "Author Name",
  "narrator": "Narrator Name",
  "image_link": "https://example.com/image.jpg",
  "amazon_link": "https://amazon.com/audiobook"
}
```

### PATCH partial update
```
PATCH /api/audiobooks/:id
Content-Type: application/json

{
  "narrator": "New Narrator Name"
}
```

### DELETE audiobook by ID
```
DELETE /api/audiobooks/:id
```

### DELETE all audiobooks
```
DELETE /api/audiobooks
```

---

## Category Books Collections

All category collections (fiction, science, biography, fantasy, history, technology, romance) follow the same pattern:

### Fiction Books

#### GET all fiction books
```
GET /api/fiction
```

#### GET fiction book by ID
```
GET /api/fiction/:id
```

#### POST create new fiction book
```
POST /api/fiction
Content-Type: application/json

{
  "name": "Fiction Book Title",
  "ISBN": "978-1234567893",
  "author": "Author Name",
  "image_link": "https://example.com/image.jpg"
}
```

#### PUT update fiction book
```
PUT /api/fiction/:id
Content-Type: application/json

{
  "name": "Updated Fiction Book",
  "ISBN": "978-1234567893",
  "author": "Author Name",
  "image_link": "https://example.com/image.jpg"
}
```

#### PATCH partial update
```
PATCH /api/fiction/:id
Content-Type: application/json

{
  "name": "New Title"
}
```

#### DELETE fiction book by ID
```
DELETE /api/fiction/:id
```

#### DELETE all fiction books
```
DELETE /api/fiction
```

---

### Science Books
- `GET /api/science`
- `GET /api/science/:id`
- `POST /api/science`
- `PUT /api/science/:id`
- `PATCH /api/science/:id`
- `DELETE /api/science/:id`
- `DELETE /api/science`

### Biography Books
- `GET /api/biography`
- `GET /api/biography/:id`
- `POST /api/biography`
- `PUT /api/biography/:id`
- `PATCH /api/biography/:id`
- `DELETE /api/biography/:id`
- `DELETE /api/biography`

### Fantasy Books
- `GET /api/fantasy`
- `GET /api/fantasy/:id`
- `POST /api/fantasy`
- `PUT /api/fantasy/:id`
- `PATCH /api/fantasy/:id`
- `DELETE /api/fantasy/:id`
- `DELETE /api/fantasy`

### History Books
- `GET /api/history`
- `GET /api/history/:id`
- `POST /api/history`
- `PUT /api/history/:id`
- `PATCH /api/history/:id`
- `DELETE /api/history/:id`
- `DELETE /api/history`

### Technology Books
- `GET /api/technology`
- `GET /api/technology/:id`
- `POST /api/technology`
- `PUT /api/technology/:id`
- `PATCH /api/technology/:id`
- `DELETE /api/technology/:id`
- `DELETE /api/technology`

### Romance Books
- `GET /api/romance`
- `GET /api/romance/:id`
- `POST /api/romance`
- `PUT /api/romance/:id`
- `PATCH /api/romance/:id`
- `DELETE /api/romance/:id`
- `DELETE /api/romance`

---

## Response Codes

- `200 OK` - Success (GET, PUT, PATCH, DELETE)
- `201 Created` - Successfully created (POST)
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Example Responses

### Success Response (GET)
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Book Title",
    "ISBN": "978-1234567890",
    "author": "Author Name",
    "image_link": "https://example.com/image.jpg",
    "amazon_link": "https://amazon.com/book",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Error Response
```json
{
  "message": "Error fetching books",
  "error": "Detailed error message"
}
```

### Duplicate ISBN Error
```json
{
  "message": "Duplicate ISBN. This book already exists.",
  "error": "E11000 duplicate key error..."
}
```

---

## Postman Collection Setup

1. **Create a new collection** in Postman named "EasyReads API"

2. **Set base URL variable:**
   - Variable name: `base_url`
   - Initial value: `http://localhost:5000/api`

3. **Create folders for each collection:**
   - Books
   - E-Books
   - Audiobooks
   - Fiction
   - Science
   - Biography
   - Fantasy
   - History
   - Technology
   - Romance

4. **For each folder, create requests:**
   - GET All
   - GET By ID
   - POST Create
   - PUT Update
   - PATCH Partial Update
   - DELETE By ID
   - DELETE All

5. **Use variables in URLs:**
   - `{{base_url}}/books`
   - `{{base_url}}/books/:id`

---

## Testing Tips

1. **Create a book first** using POST to get an ID
2. **Use the returned `_id`** for GET, PUT, PATCH, DELETE operations
3. **ISBN must be unique** - duplicate ISBNs will return 400 error
4. **Required fields** must be included in POST/PUT requests
5. **DELETE all** should be used with caution in production

---

## Sample Test Data

### Book
```json
{
  "name": "The Great Gatsby",
  "ISBN": "978-0743273565",
  "author": "F. Scott Fitzgerald",
  "image_link": "https://images-na.ssl-images-amazon.com/images/I/81QuEGw8VPL.jpg",
  "amazon_link": "https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567"
}
```

### E-Book
```json
{
  "name": "Digital Transformation",
  "ISBN": "978-1234567890",
  "author": "John Doe",
  "image_link": "https://example.com/ebook.jpg",
  "amazon_link": "https://amazon.com/ebook"
}
```

### Audiobook
```json
{
  "name": "The Art of War",
  "ISBN": "978-1234567891",
  "author": "Sun Tzu",
  "narrator": "John Smith",
  "image_link": "https://example.com/audiobook.jpg",
  "amazon_link": "https://amazon.com/audiobook"
}
```

### Category Book (Fiction)
```json
{
  "name": "1984",
  "ISBN": "978-0451524935",
  "author": "George Orwell",
  "image_link": "https://example.com/fiction.jpg"
}
```

