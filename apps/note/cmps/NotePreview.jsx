import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'
import { NoteMap } from './NoteMap.jsx'
import { NoteRecording } from './NoteRecording.jsx'
import { NoteActions } from './NoteActions.jsx'

export function NotePreview({ note, noteHandlingFuncs }) {
  const {
    id,
    type,
    info: { txt },
  } = note
  const { onPinNote } = noteHandlingFuncs

  function getNoteToRender() {
    switch (note.type) {
      case 'NoteTxt':
        return <NoteTxt {...note} />

      case 'NoteImg':
        return <NoteImg {...note} />

      case 'NoteVideo':
        return <NoteVideo {...note} />

      case 'NoteTodos':
        return <NoteTodos {...note} />

      case 'NoteCanvas':
        return <NoteCanvas {...note} />

      case 'NoteMap':
        return <NoteMap {...note} />

      case 'NoteRecording':
        return <NoteRecording {...note} />

      default:
        return null
    }
  }

  function onUpdateTitle({ target: { textContent: newTitle } }) {
    noteService.updateNoteContent(id, type, txt, newTitle)
  }

  return (
    <article className='note-preview' style={note.style}>
      <NoteHeader note={note} onUpdateTitle={onUpdateTitle} onPinNote={onPinNote} />
      {getNoteToRender()}
      <NoteActions note={note} noteHandlingFuncs={noteHandlingFuncs} />
    </article>
  )
}
