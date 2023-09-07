import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, noteHandlingFuncs }) {
  return (
    <div className='note-list'>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <NotePreview note={note} noteHandlingFuncs={noteHandlingFuncs} />
        </React.Fragment>
      ))}
    </div>
  )
}
