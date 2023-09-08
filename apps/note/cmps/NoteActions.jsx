import { ColorPicker } from './ColorPicker.jsx'
import { LabelPicker } from './LabelPicker.jsx'
import { NoteLabels } from './NoteLabels.jsx'
const { useState, useEffect, useRef } = React

export function NoteActions({ note, noteHandlingFuncs }) {
  const [isColorPickerExpanded, setIsColorPickerExpanded] = useState(false)
  const [isLabelPickerExpanded, setIsLabelPickerExpanded] = useState(false)
  const { onChangeColor, onRemoveNote, onDuplicateNote, onAddLabel, onRemoveLabel } = noteHandlingFuncs
  const colorPickerRef = useRef(null)
  const paletteIconRef = useRef(null)
  const labelPickerRef = useRef(null)
  const labelIconRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isColorPickerExpanded, isLabelPickerExpanded])

  function handleClickOutside({ target }) {
    if (
      (paletteIconRef.current && paletteIconRef.current.contains(target)) ||
      (labelIconRef.current && labelIconRef.current.contains(target))
    ) {
      if (isColorPickerExpanded && !isLabelPickerExpanded) {
        setIsLabelPickerExpanded(false)
      } else if (!isColorPickerExpanded && isLabelPickerExpanded) {
        setIsColorPickerExpanded(false)
      }
      return
    }

    if (colorPickerRef.current && !colorPickerRef.current.contains(target)) {
      setIsColorPickerExpanded(false)
    }
    if (labelPickerRef.current && !labelPickerRef.current.contains(target)) {
      setIsLabelPickerExpanded(false)
    }
  }

  return (
    <div className='note-actions'>
      <React.Fragment>
        <div>
          <a className='material-icons-outlined' onClick={() => onRemoveNote(note.id)} title='Delete note'>
            delete
          </a>
          <a
            className='material-icons-outlined'
            onClick={() => {
              setIsColorPickerExpanded(!isColorPickerExpanded)
              setIsLabelPickerExpanded(false)
            }}
            title='Change color'
            ref={paletteIconRef}
          >
            palette
          </a>
          <a
            className='material-symbols-outlined'
            onClick={() => {
              setIsLabelPickerExpanded(!isLabelPickerExpanded)
              setIsColorPickerExpanded(false)
            }}
            title='Add label'
            ref={labelIconRef}
          >
            new_label
          </a>
          <a className='material-symbols-outlined' onClick={() => onDuplicateNote(note)} title='Duplicate note'>
            content_copy
          </a>
          <a className='material-symbols-outlined' onClick={() => {}} title='Send as mail'>
            outgoing_mail
          </a>
        </div>
        <NoteLabels note={note} onRemoveLabel={onRemoveLabel} />
      </React.Fragment>
      {isLabelPickerExpanded && (
        <div ref={labelPickerRef} className='top'>
          <LabelPicker onAddLabel={onAddLabel} note={note} />
        </div>
      )}
      {isColorPickerExpanded && (
        <div ref={colorPickerRef} className='top'>
          <ColorPicker onChangeColor={onChangeColor} note={note} />
        </div>
      )}
    </div>
  )
}
