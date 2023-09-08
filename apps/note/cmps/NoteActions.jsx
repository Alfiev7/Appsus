import { ColorPicker } from './ColorPicker.jsx'
const { useState, useEffect, useRef } = React

export function NoteActions({ note, noteHandlingFuncs }) {
  const [isColorPickerExpanded, setIsColorPickerExpanded] = useState(false)
  const { onChangeColor, onRemoveNote, onDuplicateNote } = noteHandlingFuncs
  const colorPickerRef = useRef(null)
  const paletteRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (paletteRef.current && paletteRef.current.contains(event.target)) return
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setIsColorPickerExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [colorPickerRef])

  return (
    <div className='note-actions'>
      <React.Fragment>
        <div>
          <a className='material-icons-outlined' onClick={() => onRemoveNote(note.id)} title='Delete note'>
            delete
          </a>
          <a
            className='material-icons-outlined'
            onClick={() => setIsColorPickerExpanded(!isColorPickerExpanded)}
            title='Change color'
            ref={paletteRef}
          >
            palette
          </a>
          <a className='material-symbols-outlined' onClick={() => onDuplicateNote(note)} title='Duplicate note'>
            content_copy
          </a>
        </div>
      </React.Fragment>
      {isColorPickerExpanded && (
        <div ref={colorPickerRef} className='top'>
          <ColorPicker onChangeColor={onChangeColor} note={note} setIsColorPickerExpanded={setIsColorPickerExpanded} />
        </div>
      )}
    </div>
  )
}
