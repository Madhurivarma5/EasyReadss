import { useNavigate } from 'react-router-dom'
import './Categories.css'

const categories = [
  { id: 1, name: 'Fiction', route: '/books?category=fiction', api: 'fiction', image: 'https://th.bing.com/th/id/OIP.fKu9KroDzzTVFQk3q5jC-gHaLX?w=188&h=289&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 2, name: 'Science', route: '/books?category=science', api: 'science', image: 'https://cdn2.penguin.com.au/covers/original/9781409350156.jpg' },
  { id: 3, name: 'Technology', route: '/books?category=technology', api: 'technology', image: 'https://th.bing.com/th/id/OIP.KXGXvQnZksxzuBbjzqpmtwHaLh?w=188&h=292&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 4, name: 'History', route: '/books?category=history', api: 'history', image: 'https://th.bing.com/th/id/OIP.P9YLrMwz-THUbrC7Oo8hUAAAAA?w=162&h=192&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 5, name: 'Biography', route: '/books?category=biography', api: 'biography', image: 'https://th.bing.com/th/id/OIP.YKMfmtiwurEnx9ertgQg-gHaL6?w=188&h=303&c=7&r=0&o=5&dpr=1.4&pid=1.7' },
  { id: 6, name: 'Fantasy', route: '/books?category=fantasy', api: 'fantasy', image: 'https://th.bing.com/th/id/OIP.cvexECPTvVLzlZWuLoaRegHaL2?rs=1&pid=ImgDetMain' },
  { id: 7, name: 'Romance', route: '/books?category=romance', api: 'romance', image: 'https://images.squarespace-cdn.com/content/v1/59e235dcd7bdcec81eb68962/1575860872067-04EH3B6LX0ZNNXH26H88/ke17ZwdGBToddI8pDm48kD755XqWqn8HkRX8WSTt5GJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1URwn7vetbNoOrjGqAVoZN5bz1XPY0_Ev1nDpBBPOnwUda4oDI66FEaoPF3aKRzQZjg/Romance+Unleashed+by+Diana+Plamer.jpg' },
]

function Categories() {
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    // Store visited category in localStorage for recommendations
    const visitedCategories = JSON.parse(localStorage.getItem('visitedCategories')) || []
    if (!visitedCategories.includes(category.api)) {
      visitedCategories.push(category.api)
      localStorage.setItem('visitedCategories', JSON.stringify(visitedCategories))
    }
    navigate(category.route)
  }

  return (
    <section className="categories-section">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-scroll-container">
        <div className="categories-scroll-content">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-cover">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-book.jpg'
                  }}
                />
              </div>
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
