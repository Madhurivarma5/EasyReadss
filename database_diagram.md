# EasyReads Database Diagram

## MongoDB Collections

### Collections Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    EasyReads Database                       │
│                    (MongoDB)                                │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    books     │      │    ebooks    │      │  audiobooks  │
└──────────────┘      └──────────────┘      └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ fictionbooks │      │ sciencebooks │      │biographybooks │
└──────────────┘      └──────────────┘      └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ fantasybooks │      │ historybooks │      │technologybooks│
└──────────────┘      └──────────────┘      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │ romancebooks │
                      └──────────────┘
```

## Collection Schemas

### 1. books (General Books)
```
┌─────────────────────────────────────┐
│            books                    │
├─────────────────────────────────────┤
│ _id: ObjectId (PK)                  │
│ name: String (required)             │
│ ISBN: String (required, unique)    │
│ author: String (required)           │
│ image_link: String (required)       │
│ amazon_link: String (required)      │
│ createdAt: Date (auto)              │
│ updatedAt: Date (auto)              │
└─────────────────────────────────────┘
```

### 2. ebooks (E-Books)
```
┌─────────────────────────────────────┐
│            ebooks                    │
├─────────────────────────────────────┤
│ _id: ObjectId (PK)                  │
│ name: String (required)             │
│ ISBN: String (required, unique)     │
│ author: String (required)           │
│ image_link: String (required)       │
│ amazon_link: String (optional)       │
│ createdAt: Date (auto)              │
│ updatedAt: Date (auto)              │
└─────────────────────────────────────┘
```

### 3. audiobooks (Audiobooks)
```
┌─────────────────────────────────────┐
│          audiobooks                  │
├─────────────────────────────────────┤
│ _id: ObjectId (PK)                  │
│ name: String (required)             │
│ ISBN: String (required, unique)     │
│ author: String (required)           │
│ narrator: String (optional)         │
│ image_link: String (required)       │
│ amazon_link: String (optional)       │
│ createdAt: Date (auto)              │
│ updatedAt: Date (auto)              │
└─────────────────────────────────────┘
```

### 4. Category Books (Fiction, Science, Biography, Fantasy, History, Technology, Romance)
```
┌─────────────────────────────────────┐
│   fictionbooks / sciencebooks /      │
│   biographybooks / fantasybooks /   │
│   historybooks / technologybooks /  │
│   romancebooks                      │
├─────────────────────────────────────┤
│ _id: ObjectId (PK)                  │
│ name: String (required)             │
│ ISBN: String (required, unique)     │
│ author: String (required)           │
│ image_link: String (required)       │
│ createdAt: Date (auto)              │
│ updatedAt: Date (auto)              │
└─────────────────────────────────────┘
```

### 5. users (User Accounts - Optional MongoDB Collection)
```
┌─────────────────────────────────────┐
│            users                     │
├─────────────────────────────────────┤
│ _id: ObjectId (PK)                  │
│ username: String (required, unique) │
│ password: String (required, hashed) │
│ createdAt: Date (auto)              │
│ updatedAt: Date (auto)              │
└─────────────────────────────────────┘
```

**Note:** User authentication is primarily handled by Firebase Auth, but this MongoDB collection can be used for additional user data storage.

## Relationships

- **No explicit foreign keys** - MongoDB is a NoSQL database
- Collections are **independent** - each book type has its own collection
- **ISBN** serves as a unique identifier across collections
- **Timestamps** are automatically managed by Mongoose

## Indexes

- `ISBN` - Unique index on all book collections
- `username` - Unique index on users collection (if used)

## Data Flow

```
Frontend Request
    │
    ▼
Backend API Routes (/api/books, /api/fiction, etc.)
    │
    ▼
Mongoose Models (BookSchema, FictionBookSchema, etc.)
    │
    ▼
MongoDB Collections (books, fictionbooks, etc.)
```

