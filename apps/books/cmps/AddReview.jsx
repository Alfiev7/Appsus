import { SurveyIndex } from '../pages/SurveyIndex.jsx'
import { bookService } from '../services/book.service.js'

const { useState } = React

export function AddReview({ onAddReview }) {
  const [reviewToEdit, setReviewToEdit] = useState(bookService.getEmptyReview())

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

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

    setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
  }

  function onSetRating(rating) {
    setReviewToEdit(prevReview => ({ ...prevReview, rating }))
  }

  function onSaveReview(ev) {
    ev.preventDefault()
    onAddReview(reviewToEdit)
  }

  const { fullname, readAt } = reviewToEdit

  return (
    <section className='book-edit'>
      <form onSubmit={onSaveReview}>
        <label htmlFor='fullname'>Fullname:</label>
        <input
          onChange={handleChange}
          value={fullname}
          type='text'
          name='fullname'
          id='fullname'
          required
        />

        <SurveyIndex onSetRating={onSetRating} />

        <label htmlFor='readAt'>Read at:</label>
        <input
          onChange={handleChange}
          value={readAt}
          type='date'
          name='readAt'
          id='readAt'
          required
        />

        <button>Save</button>
      </form>
    </section>
  )
}
