import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookCard from '../components/BookCard'
import './Books.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const categories = [
  { name: 'All Books', api: 'books' },
  { name: 'Fiction', api: 'fiction' },
  { name: 'Science', api: 'science' },
  { name: 'Biography', api: 'biography' },
  { name: 'Fantasy', api: 'fantasy' },
  { name: 'History', api: 'history' },
  { name: 'Technology', api: 'technology' },
  { name: 'Romance', api: 'romance' },
]

function Books() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'books'
  )

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const category = categories.find((c) => c.api === categoryParam)
      if (category) {
        setSelectedCategory(category.api)
      }
    }
  }, [searchParams])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const category = categories.find((c) => c.api === selectedCategory)
        const url = category ? `${API_BASE_URL}/${category.api}` : `${API_BASE_URL}/books`
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        const data = await response.json()
        setBooks(data)
        setError(null)

        // Store visited category for recommendations
        if (category && category.api !== 'books') {
          const visitedCategories = JSON.parse(localStorage.getItem('visitedCategories')) || []
          if (!visitedCategories.includes(category.api)) {
            visitedCategories.push(category.api)
            localStorage.setItem('visitedCategories', JSON.stringify(visitedCategories))
          }
        }
      } catch (err) {
        console.error('Error fetching books:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [selectedCategory])

  const handleCategoryChange = (categoryApi) => {
    setSelectedCategory(categoryApi)
    const category = categories.find((c) => c.api === categoryApi)
    if (category && categoryApi !== 'books') {
      setSearchParams({ category: categoryApi })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="books-page">
      <Navbar />
      <main className="books-main">
        <div className="books-content">
          <h1 className="books-title">Books</h1>
          
          {/* Category Filter */}
          <div className="books-categories">
            {categories.map((category) => (
              <button
                key={category.api}
                className={`category-button ${
                  selectedCategory === category.api ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(category.api)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="books-loading">Loading books...</div>
          ) : error ? (
            <div className="books-error">Error: {error}</div>
          ) : books.length === 0 ? (
            <div className="books-empty">No books found in this category</div>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <BookCard key={book._id || book.ISBN} book={book} type="book" />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Books

