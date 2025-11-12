import { useEffect, useState } from 'react'
import BookCard from './BookCard'
import './Recommendations.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function Recommendations() {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      const visitedCategories = JSON.parse(localStorage.getItem('visitedCategories')) || []
      let recommendedBooks = []

      for (const category of visitedCategories) {
        try {
          const response = await fetch(`${API_BASE_URL}/${category}`)
          if (response.ok) {
            const data = await response.json()
            recommendedBooks = [...recommendedBooks, ...data]
          }
        } catch (error) {
          console.error(`Error fetching books for category ${category}:`, error)
        }
      }

      // Shuffle the recommended books and limit to 20
      recommendedBooks = shuffleArray(recommendedBooks).slice(0, 20)
      setRecommendations(recommendedBooks)
      setLoading(false)
    }

    fetchRecommendations()
  }, [])

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  if (loading) {
    return (
      <section className="recommendations-section">
        <h2 className="recommendations-title">Recommendations</h2>
        <div className="recommendations-loading">Loading recommendations...</div>
      </section>
    )
  }

  return (
    <section className="recommendations-section">
      <h2 className="recommendations-title">Recommendations</h2>
      <div className="recommendations-container">
        <div className="recommendations-content">
          {recommendations.length === 0 ? (
            <div className="recommendations-empty">
              Explore categories to get personalized recommendations
            </div>
          ) : (
            recommendations.map((book) => (
              <BookCard key={book._id || book.ISBN} book={book} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Recommendations

