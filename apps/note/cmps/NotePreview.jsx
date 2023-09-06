import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { ColorPicker } from './ColorPicker.jsx'

const { useState, useEffect, useRef } = React

export function NotePreview({ note, onRemoveNote, onChangeColor }) {
  const [isColorPickerExpanded, setIsColorPickerExpanded] = useState(false)
  const colorPickerRef = useRef(null)
  const paletteRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (paletteRef.current && paletteRef.current.contains(event.target))
        return
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setIsColorPickerExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
    <article className='note-preview' style={note.style}>
      {getNoteToRender()}
      <div className='note-actions'>
        <React.Fragment>
          <div>
            <a
              className='material-icons-outlined'
              onClick={() => onRemoveNote(note.id)}
            >
              delete
            </a>
            <a
              className='material-icons-outlined'
              onClick={() => setIsColorPickerExpanded(!isColorPickerExpanded)}
              ref={paletteRef}
            >
              palette
            </a>
          </div>
          {isColorPickerExpanded && (
            <div ref={colorPickerRef} className='top'>
              <ColorPicker
                onChangeColor={onChangeColor}
                note={note}
                setIsColorPickerExpanded={setIsColorPickerExpanded}
              />
            </div>
          )}
        </React.Fragment>
      </div>
    </article>
  )
}
