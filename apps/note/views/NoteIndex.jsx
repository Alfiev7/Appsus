const { useEffect, useState } = React
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { KeepHeader } from '../cmps/KeepHeader.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

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

  function onAddNote(note, isDuplicate = false) {
    noteService
      .save(note)
      .then(note => {
        setNotes(prevNotes => [...prevNotes, note])
        !isDuplicate && showSuccessMsg('Note added')
      })
      .catch(err => {
        console.error('Unable to save note:', err)
        showErrorMsg('Unable to add note')
      })
  }

  function onDuplicateNote(note) {
    const duplicatedNote = structuredClone(note)
    duplicatedNote.id = null
    onAddNote(duplicatedNote, true)
    showSuccessMsg('Note duplicated')
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes(notes.filter(note => note.id !== noteId))
        showSuccessMsg('Note removed')
      })
      .catch(err => {
        console.error('Cannot remove note:', err)
        showErrorMsg('Unable to remove note')
      })
  }

  function onChangeColor(noteId, newBackground, isBackground) {
    noteService
      .get(noteId)
      .then(note => {
        note.style = isBackground
          ? { backgroundImage: newBackground, backgroundSize: 'cover' }
          : { backgroundColor: newBackground }
        return noteService.save(note)
      })
      .then(updatedNote => {
        const updatedNotes = notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
        setNotes(updatedNotes)
      })
      .catch(error => {
        console.error('Error updating note:', error)
        showErrorMsg('Unable to change color')
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
        const updatedNotes = notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
        setNotes(updatedNotes)
        updatedNote.isPinned && showSuccessMsg('Note pinned')
        !updatedNote.isPinned && showSuccessMsg('Note unpinned')
      })
      .catch(error => {
        console.error('Error updating note:', error)
        showErrorMsg('Unable to pin note')
      })
  }

  const noteHandlingFuncs = {
    onRemoveNote,
    onChangeColor,
    onDuplicateNote,
    onPinNote,
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className='note-index'>
      <KeepHeader onSetFilterBy={onSetFilterBy} />
      <AddNote onAddNote={onAddNote} />

      {hasPinnedNotes && (
        <div className='pinned-notes'>
          <pre className='pinned-notes-label'>Pinned</pre>
          <NoteList notes={notes.filter(note => note.isPinned)} noteHandlingFuncs={noteHandlingFuncs} />
        </div>
      )}

      <div className='unpinned-notes'>
        {hasPinnedNotes && <pre className='unpinned-notes-label'>Other notes</pre>}
        <NoteList notes={notes.filter(note => !note.isPinned)} noteHandlingFuncs={noteHandlingFuncs} />
      </div>
      <UserMsg />
    </section>
  )
}
