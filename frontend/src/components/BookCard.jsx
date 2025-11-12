import './BookCard.css'

function BookCard({ book, type = 'book' }) {
  const handlePreview = (e) => {
    e.stopPropagation() // Prevent card click if preview button is clicked
    if (book.amazon_link) {
      window.open(book.amazon_link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="book-card">
      <div className="book-card-image-container">
        <img
          src={book.image_link || '/placeholder-book.jpg'}
          alt={book.name}
          className="book-card-image"
          onError={(e) => {
            e.target.src = '/placeholder-book.jpg'
          }}
        />
      </div>
      <div className="book-card-content">
        <h3 className="book-card-title">{book.name}</h3>
        <p className="book-card-author">{book.author}</p>
        {type === 'audiobook' && book.narrator && (
          <p className="book-card-narrator">Narrator: {book.narrator}</p>
        )}
        {book.amazon_link && (
          <button onClick={handlePreview} className="book-card-preview">
            Preview
          </button>
        )}
      </div>
    </div>
  )
}

export default BookCard

