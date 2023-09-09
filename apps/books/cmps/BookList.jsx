import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook, isToAdd, onAddBook }) {
  return (
    <ul className='book-list'>
      {books.map((book, idx) => (
        <li key={(book.id && book.id) || idx}>
          <BookPreview book={book} />
          <section>
            {(!isToAdd && (
              <React.Fragment>
                <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                <button>
                  <Link to={`${book.id}`}>Details</Link>
                </button>
                <button>
                  <Link to={`edit/${book.id}`}>Edit</Link>
                </button>
              </React.Fragment>
            )) || <button onClick={() => onAddBook(book)}>Add Book</button>}
          </section>
        </li>
      ))}
    </ul>
  )
}
