const { useEffect, useState } = React
const { useLocation } = ReactRouterDOM
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
  const location = useLocation()

  useEffect(() => {
    notes && sethasPinnedNotes(notes.some(note => note.isPinned))
  }, [notes])

  useEffect(() => {
    noteService.query(filterBy).then(setNotes)
    const queryParams = new URLSearchParams(location.search)
    const title = queryParams.get('title')
    const content = queryParams.get('content')
    if (title && content) {
      console.log('title', title)
      console.log('content', content)
      const noteFromEmail = noteService.getEmptyNote(title, content)
      console.log('noteFromEmail', noteFromEmail)
      onAddNote(noteFromEmail)
    }
  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  function onAddNote(note, isDuplicate = false) {
    console.log('note', note)
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

  function onAddLabel(noteId, { txt, color }) {
    noteService
      .get(noteId)
      .then(note => {
        const newLabel = { txt, color }
        note.info.labels = note.info.labels ? [...note.info.labels, newLabel] : [newLabel]
        return noteService.save(note).then(() => newLabel)
      })
      .then(newLabel => {
        setNotes(notes =>
          notes.map(note =>
            note.id === noteId
              ? {
                  ...note,
                  info: { ...note.info, labels: note.info.labels ? [...note.info.labels, newLabel] : [newLabel] },
                }
              : note
          )
        )
        showSuccessMsg('Label added')
      })
      .catch(err => {
        console.error('Error updating note:', err)
        showErrorMsg('Unable to add label')
      })
  }

  function onRemoveLabel(noteId, index) {
    noteService
      .get(noteId)
      .then(note => {
        note.info.labels.splice(index, 1)
        return noteService.save(note)
      })
      .then(updatedNote => {
        const updatedNotes = notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
        setNotes(updatedNotes)
        showSuccessMsg('Label removed')
      })
      .catch(err => {
        console.error('Error removing label:', err)
        showErrorMsg('Unable to remove label')
      })
  }

  const noteHandlingFuncs = {
    onRemoveNote,
    onChangeColor,
    onDuplicateNote,
    onPinNote,
    onAddLabel,
    onRemoveLabel,
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
