# EasyReads Diagrams Documentation

## Database Diagram

The database diagram is available in `database_diagram.md`. It shows:
- All MongoDB collections and their schemas
- Field types and constraints
- Relationships between collections
- Indexes

## Class Diagram (PlantUML)

The PlantUML class diagram is available in `class_diagram.puml`.

### How to View the PlantUML Diagram

#### Option 1: Online Viewer
1. Go to [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
2. Copy the contents of `class_diagram.puml`
3. Paste into the online editor
4. View the generated diagram

#### Option 2: VS Code Extension
1. Install "PlantUML" extension in VS Code
2. Open `class_diagram.puml`
3. Press `Alt+D` (or `Cmd+D` on Mac) to preview

#### Option 3: Local Installation
```bash
# Install PlantUML (requires Java)
# On Arch Linux
sudo pacman -S plantuml

# On Ubuntu/Debian
sudo apt-get install plantuml

# Generate PNG
plantuml class_diagram.puml

# Generate SVG
plantuml -tsvg class_diagram.puml
```

#### Option 4: Docker
```bash
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
# Then access http://localhost:8080
```

### Diagram Structure

The class diagram includes:

1. **Backend Package**
   - Models: All Mongoose schemas (Book, EBook, Audiobook, Category Books)
   - Routes: API route handlers
   - Middleware: Authentication and database connection
   - Server: Main Express application

2. **Frontend Package**
   - Pages: Main page components (Home, Books, DigitalBooks, Login, Signup, Admin)
   - Components: Reusable UI components (Navbar, Footer, BookCard, etc.)
   - Contexts: React context providers (AuthContext)
   - Utils: Utility functions (AdminUtils)

3. **External Services**
   - Firebase Auth: Authentication service
   - Google Books API: E-books and audiobooks data
   - MongoDB: Database

### Key Relationships

- **BookRoutes** uses all book models to fetch data
- **Server** orchestrates all routes and middleware
- **Pages** contain components and use contexts
- **AuthContext** manages authentication state via Firebase
- **GoogleBooksSection** fetches data from Google Books API
- **BookRoutes** queries MongoDB collections

## Quick Reference

### MongoDB Collections
- `books` - General books
- `ebooks` - E-books
- `audiobooks` - Audiobooks
- `fictionbooks` - Fiction category
- `sciencebooks` - Science category
- `biographybooks` - Biography category
- `fantasybooks` - Fantasy category
- `historybooks` - History category
- `technologybooks` - Technology category
- `romancebooks` - Romance category

### Main React Components
- `App` - Root component with routing
- `Home` - Main landing page
- `Books` - Books browsing page
- `DigitalBooks` - E-books and audiobooks page
- `Login` / `Signup` - Authentication pages
- `Admin` - Admin dashboard

### API Endpoints
- `/api/books` - Get all books
- `/api/fiction` - Get fiction books
- `/api/science` - Get science books
- `/api/biography` - Get biography books
- `/api/fantasy` - Get fantasy books
- `/api/history` - Get history books
- `/api/technology` - Get technology books
- `/api/romance` - Get romance books
- `/api/ebooks` - Get e-books
- `/api/audiobooks` - Get audiobooks
- `/api/auth/verify` - Verify auth token
- `/api/admin/users` - Get all users (admin only)

