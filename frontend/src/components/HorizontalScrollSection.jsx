import { useState, useEffect } from 'react'
import BookCard from './BookCard'
import './HorizontalScrollSection.css'

function HorizontalScrollSection({ title, fetchUrl, type = 'book' }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const response = await fetch(fetchUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        const data = await response.json()
        setBooks(data)
        setError(null)
      } catch (err) {
        console.error(`Error fetching ${title}:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [fetchUrl, title])

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
            books.map((book) => (
              <BookCard key={book._id || book.ISBN} book={book} type={type} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default HorizontalScrollSection

