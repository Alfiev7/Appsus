import { NotePreview } from './NotePreview.jsx'

export function NoteList({
  notes,
  onRemoveNote,
  onChangeColor,
  onPinNote,
  onDuplicateNote,
}) {
  return (
    <div className='note-list'>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <NotePreview
            note={note}
            onRemoveNote={onRemoveNote}
            onChangeColor={onChangeColor}
            onPinNote={onPinNote}
            onDuplicateNote={onDuplicateNote}
          />
        </React.Fragment>
      ))}
    </div>
  )
}
