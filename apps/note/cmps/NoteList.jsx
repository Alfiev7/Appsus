import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote, onChangeColor }) {
  console.log('notes', notes)
  return (
    <div className='note-list'>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <NotePreview
            note={note}
            onRemoveNote={onRemoveNote}
            onChangeColor={onChangeColor}
          />
        </React.Fragment>
      ))}
    </div>
  )
}
