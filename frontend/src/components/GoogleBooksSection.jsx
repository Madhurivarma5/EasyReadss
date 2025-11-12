import { useState, useEffect } from 'react'
import './GoogleBooksSection.css'

const MAX_RESULTS = 12
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

function GoogleBooksSection({ title, type = 'ebooks' }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (!API_KEY) {
          throw new Error('Google Books API key not configured')
        }

        const url =
          type === 'ebooks'
            ? `https://www.googleapis.com/books/v1/volumes?q=filter=ebooks&startIndex=0&maxResults=${MAX_RESULTS}&key=${API_KEY}`
            : `https://www.googleapis.com/books/v1/volumes?q=subject:audiobooks&startIndex=0&maxResults=${MAX_RESULTS}&key=${API_KEY}`
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        
        const data = await response.json()
        setBooks(data.items || [])
      } catch (err) {
        console.error(`Error fetching ${title}:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [title, type])

  if (loading) {
    return (
      <section className="scroll-section">
        <h2 className="scroll-section-title">{title}</h2>
        <div className="scroll-section-loading">Loading...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="scroll-section">
        <h2 className="scroll-section-title">{title}</h2>
        <div className="scroll-section-error">Error loading {title.toLowerCase()}</div>
      </section>
    )
  }

  return (
    <section className="scroll-section">
      <h2 className="scroll-section-title">{title}</h2>
      <div className="scroll-section-container">
        <div className="scroll-section-content">
          {books.length === 0 ? (
            <div className="scroll-section-empty">
              No {title.toLowerCase()} available
            </div>
          ) : (
            books.map((book, index) => (
              <div key={book.id || index} className="book-card">
                <div className="book-card-image-container">
                  <img
                    src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo?.title || 'Book'}
                    className="book-card-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150'
                    }}
                  />
                </div>
                <div className="book-card-content">
                  <h3 className="book-card-title">
                    {book.volumeInfo?.title || 'Untitled'}
                  </h3>
                  <p className="book-card-author">
                    {book.volumeInfo?.authors?.join(', ') || 'Unknown Author'}
                  </p>
                  {book.volumeInfo?.previewLink && (
                    <a
                      href={book.volumeInfo.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="book-card-preview-link"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default GoogleBooksSection

