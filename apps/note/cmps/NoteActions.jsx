import { ColorPicker } from './ColorPicker.jsx'
import { LabelPicker } from './LabelPicker.jsx'
import { NoteLabels } from './NoteLabels.jsx'
import { showErrorMsg } from '../../../services/event-bus.service.js'
const { useState, useEffect, useRef } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function NoteActions({ note, noteHandlingFuncs }) {
  const [isColorPickerExpanded, setIsColorPickerExpanded] = useState(false)
  const [isLabelPickerExpanded, setIsLabelPickerExpanded] = useState(false)
  const { onChangeColor, onRemoveNote, onDuplicateNote, onAddLabel, onRemoveLabel } = noteHandlingFuncs
  const colorPickerRef = useRef(null)
  const paletteIconRef = useRef(null)
  const labelPickerRef = useRef(null)
  const labelIconRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { id, info, type } = note

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

  function sendAsEmail() {
    if (type === 'NoteMap') {
      showErrorMsg('You cannot send a map as an email')
      return
    }
    const queryParams = new URLSearchParams(location.search)
    queryParams.set('title', info.title)
    queryParams.set('content', info.txt ? info.txt : info.url || info.todos.map(todo => todo.txt))
    const newSearch = queryParams.toString()

    navigate('/mail?' + newSearch)
  }

  return (
    <div className='note-actions'>
      <React.Fragment>
        <div>
          <a className='material-icons-outlined' onClick={() => onRemoveNote(id)} title='Delete note'>
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
          <a className='material-symbols-outlined' onClick={() => sendAsEmail()} title='Send as mail'>
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
