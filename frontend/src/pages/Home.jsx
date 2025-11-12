import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Categories from '../components/Categories'
import Recommendations from '../components/Recommendations'
import HorizontalScrollSection from '../components/HorizontalScrollSection'
import GoogleBooksSection from '../components/GoogleBooksSection'
import './Home.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <div className="home-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h1 className="welcome-title">Hi there, Welcome to EasyReads</h1>
            <p className="welcome-subtitle">
              Explore books, discover recommendations, and experience our comprehensive library system.
            </p>
          </section>

          {/* Categories Section */}
          <Categories />

          {/* Recommendations Section */}
          <Recommendations />

          {/* Books Section */}
          <HorizontalScrollSection
            title="Books"
            fetchUrl={`${API_BASE_URL}/books`}
            type="book"
          />

          {/* E-Books Section */}
          <GoogleBooksSection
            title="E-Books"
            type="ebooks"
          />

          {/* Audiobooks Section */}
          <GoogleBooksSection
            title="Audiobooks"
            type="audiobooks"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
