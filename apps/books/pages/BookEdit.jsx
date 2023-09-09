import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const [bookToAdd, setBookToAdd] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBookToAdd)
      .catch(err => console.log('err:', err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (field === 'categories' || field === 'authors') value = [value]

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setBookToAdd(prevBookToAdd => ({ ...prevBookToAdd, [field]: value }))
  }

  function handlePriceChange({ target }) {
    let value = +target.value
    const listPrice = {...bookToAdd.listPrice, amount: value}
    setBookToAdd(prevBookToAdd => ({ ...prevBookToAdd, listPrice }))
  }

  function onSubmitBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToAdd)
      .then(() => {
        showSuccessMsg(`Book saved successfully`)
        navigate('/book')
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg("Couldn't save book")
      })
  }

  function onBack() {
    navigate('/book')
  }

  return (
    <section className='add-book'>
      <h2>Add a new book</h2>
      <form onSubmit={onSubmitBook}>
        <label htmlFor='title'>Title: </label>
        <input
          value={bookToAdd.title}
          onChange={handleChange}
          type='text'
          placeholder='Title'
          id='title'
          name='title'
          required
        />

        <label htmlFor='subtitle'>Subtitle:</label>
        <input
          value={bookToAdd.subtitle}
          onChange={handleChange}
          type='text'
          placeholder='Subtitle'
          id='subtitle'
          name='subtitle'
          required
        />

        {/* <label htmlFor='authors'>Authors:</label>
        <input
          value={bookToAdd.authors}
          onChange={handleChange}
          type='text'
          placeholder='Authors'
          id='authors'
          name='authors'
          required
        /> */}

        <label htmlFor='price'>Price: </label>
        <input
          value={bookToAdd.listPrice.amount || 0}
          onChange={handlePriceChange}
          type='number'
          placeholder='price'
          id='price'
          name='price'
          required
        />
{/* 
        <label htmlFor='publishedDate'>Published: </label>
        <input
          value={bookToAdd.publishedDate}
          onChange={handleChange}
          type='number'
          placeholder='Published Date'
          id='publishedDate'
          name='publishedDate'
          required
        />

        <label htmlFor='description'>Description: </label>
        <input
          value={bookToAdd.description}
          onChange={handleChange}
          type='text'
          placeholder='Description'
          id='description'
          name='description'
          required
        />

        <label htmlFor='pageCount'>PageCount: </label>
        <input
          value={bookToAdd.pageCount}
          onChange={handleChange}
          type='number'
          placeholder='PageCount'
          id='pageCount'
          name='pageCount'
          required
        />

        <label htmlFor='categories'>Categories: </label>
        <input
          value={bookToAdd.categories}
          onChange={handleChange}
          type='text'
          placeholder='Categories'
          id='categories'
          name='categories'
          required
        />

        <label htmlFor='thumbnail'>Thumbnail: </label>
        <input
          value={bookToAdd.thumbnail}
          onChange={handleChange}
          type='text'
          placeholder='Thumbnail'
          id='thumbnail'
          name='thumbnail'
          required
        />

        <label htmlFor='language'>Language: </label>
        <input
          value={bookToAdd.language}
          onChange={handleChange}
          type='text'
          placeholder='Language'
          id='language'
          name='language'
          required
        /> */}

        <button>Save</button>
      </form>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
