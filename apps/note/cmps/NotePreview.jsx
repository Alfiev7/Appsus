import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { ColorPicker } from './ColorPicker.jsx'

const { useState } = React

export function NotePreview({ note, onRemoveNote, onChangeColor }) {
  const [isColorPickerExpanded, setIsColorPickerExpanded] = useState(false)
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

      default:
        return null
    }
  }
  return (
    <React.Fragment>
      <article className='note-preview'>
        {getNoteToRender()}
        <div className='note-actions'>
          <a
            className='material-icons-outlined md-32'
            onClick={() => onRemoveNote(note.id)}
          >
            delete
          </a>
          <a
            className='material-icons-outlined'
            onClick={() => setIsColorPickerExpanded(!isColorPickerExpanded)}
          >
            palette
          </a>
        </div>
      </article>
      {isColorPickerExpanded && <ColorPicker />}
    </React.Fragment>
  )
}
