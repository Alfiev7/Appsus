import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { AddBook } from './AddBook.jsx'

const { useState, useEffect, useRef } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [isAddingBook, setIsAddingBook] = useState(false)
  const buttonRef = useRef()

  useEffect(() => {
    bookService.query(filterBy).then(books => {
      setBooks(books)
    })
  }, [filterBy])

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        showSuccessMsg(`Book Removed! ${bookId}`)
      })
      .catch(err => {
        console.error(err)
        showErrorMsg(`Problem Removing ${bookId}`)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function onAddBook(book) {
    bookService
      .addGoogleBook(book)
      .then(book => {
        setBooks(prevBooks => [...prevBooks, book])
        setIsAddingBook(false)
        showSuccessMsg(`Book Added!`)
      })
      .catch(err => {
        console.error(err)
        showErrorMsg(`Problem Adding Book`)
      })
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className='book-index'>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <button
        onClick={() => setIsAddingBook(!isAddingBook)}
        ref={buttonRef}
        onMouseOver={() => utilService.animateCSS(buttonRef.current, 'pulse')}
      >
        Add Book
      </button>
      {isAddingBook && <AddBook onAddBook={onAddBook} />}
      {!isAddingBook && <BookList books={books} onRemoveBook={onRemoveBook} />}
    </section>
  )
}
