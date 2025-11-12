import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">EasyReads</h3>
            <p className="footer-text">
              Your one-stop destination for books, eBooks, and audiobooks.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/home">Home</a></li>
              <li><a href="/books">Books</a></li>
              <li><a href="/digital-books">Digital Books</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li>Fiction</li>
              <li>Science</li>
              <li>Biography</li>
              <li>Fantasy</li>
              <li>History</li>
              <li>Technology</li>
              <li>Romance</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EasyReads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

