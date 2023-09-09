import { BookList } from '../cmps/BookList.jsx'
import { googleBookService } from '../services/google-book.service.js'

const { useState, useRef } = React

export function AddBook({ onAddBook }) {
  const [searchValue, setSearchValue] = useState('')
  const [books, setBooks] = useState(null)
  const debouncedOnSearchBook = useRef(debounce(onSearchBook, 1000))

  function debounce(func, wait) {
    let timeout

    return function (...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  function handleInputChange({ target }) {
    setSearchValue(target.value)

    debouncedOnSearchBook.current(target.value)
  }

  function onSearchBook(searchText) {
    googleBookService.query(searchText).then(res => {
      setBooks(res)
    })
  }

  return (
    <section className='add-book'>
      <input
        type='text'
        name='search-book'
        id='search-book'
        className='search-book'
        placeholder='Search Books'
        value={searchValue}
        onChange={handleInputChange}
      />
      {books && <BookList books={books} isToAdd={true} onAddBook={onAddBook} />}
    </section>
  )
}
