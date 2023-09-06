const { useEffect, useState } = React
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes(notes.filter(note => note.id !== noteId))
      })
      .catch(err => console.log(err))
  }

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

  useEffect(() => {
    noteService.getNotes().then(setNotes)
  }, [])

  if (!notes) return <div>Loading...</div>
  return (
    <section className='note-index'>
      {<NoteList notes={notes} onRemoveNote={onRemoveNote} />}
    </section>
  )
}
