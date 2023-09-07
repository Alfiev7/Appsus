const { useEffect, useState } = React
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { KeepHeader } from '../cmps/KeepHeader.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState('')
  const [hasPinnedNotes, sethasPinnedNotes] = useState(false)

  useEffect(() => {
    notes && sethasPinnedNotes(notes.some(note => note.isPinned))
  }, [notes])

  useEffect(() => {
    noteService.query(filterBy).then(setNotes)
  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

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

  function onPinNote(noteId) {
    noteService
      .get(noteId)
      .then(note => {
        note.isPinned = !note.isPinned
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
      <KeepHeader onSetFilterBy={onSetFilterBy} />
      <AddNote onAddNote={onAddNote} />

      {hasPinnedNotes && (
        <div className='pinned-notes'>
          <pre className='pinned-notes-label'>Pinned</pre>
          <NoteList
            notes={notes.filter(note => note.isPinned)}
            hasPinnedNotes={hasPinnedNotes}
            onRemoveNote={onRemoveNote}
            onChangeColor={onChangeColor}
            onPinNote={onPinNote}
          />
        </div>
      )}

      <div className='unpinned-notes'>
        {hasPinnedNotes && (
          <pre className='unpinned-notes-label'>Other notes</pre>
        )}
        <NoteList
          notes={notes.filter(note => !note.isPinned)}
          onRemoveNote={onRemoveNote}
          onChangeColor={onChangeColor}
          onPinNote={onPinNote}
        />
      </div>
    </section>
  )
}
