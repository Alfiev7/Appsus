const { useEffect, useState } = React
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    noteService.query('').then(setNotes)
  }, [])

  function onAddNote(note) {
    noteService
      .save(note)
      .then(note => setNotes(prevNotes => [...prevNotes, note]))
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes(notes.filter(note => note.id !== noteId))
      })
      .catch(err => console.log(err))
  }

  function onChangeColor(noteId, backgroundColor) {
    noteService
      .get(noteId)
      .then(note => {
        note.style.backgroundColor = backgroundColor
        return noteService.save(note)
      })
      .then(updatedNote => {
        const updatedNotes = notes.map(note =>
          note.id === updatedNote.id ? updatedNote : note
        )
        setNotes(updatedNotes)
      })
      .catch(error => {
        console.error('Error updating note:', error)
      })
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className='note-index'>
      <AddNote onAddNote={onAddNote} />
      {
        <NoteList
          notes={notes}
          onRemoveNote={onRemoveNote}
          onChangeColor={onChangeColor}
        />
      }
    </section>
  )
}
