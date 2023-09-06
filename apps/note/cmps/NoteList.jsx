import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
  return (
    <div className='note-list'>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <NotePreview note={note} onRemoveNote={onRemoveNote} />
        </React.Fragment>
      ))}
    </div>
  )
}
