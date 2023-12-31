const { useState, useRef, useEffect } = React
import { noteService } from '../services/note.service.js'

export function AddNote({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState('add_notes')
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const titleInputRef = useRef(null)
  const addNoteSectionRef = useRef(null)
  const contentInputRef = useRef(null)
  const pinIconRef = useRef(null)
  const icons = noteService.getIcons()
  const { info } = noteToAdd

  useEffect(() => {
    function handleClickOutside({ target }) {
      const isInsideAddNoteSection = addNoteSectionRef.current && addNoteSectionRef.current.contains(target)
      const isInsidePinIcon = pinIconRef.current && pinIconRef.current.contains(target)

      if (isInsideAddNoteSection || isInsidePinIcon) {
        return
      }

      if (isExpanded) {
        const isOutsideTitleInput = titleInputRef.current && !titleInputRef.current.contains(target)

        if (isOutsideTitleInput) {
          if (info.txt || info.title || info.url) {
            onAddNote(noteToAdd)
          }
          setIsExpanded(false)
          setSelectedIcon('add_notes')
          setNoteToAdd(noteService.getEmptyNote())
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded, noteToAdd, onAddNote])

  useEffect(() => {
    const { placeholder, disabled, isExpanded, type } = icons[selectedIcon]
    contentInputRef.current.placeholder = placeholder
    noteToAdd.info.txt = ''
    noteToAdd.info.url = ''
    contentInputRef.current.disabled = disabled
    setIsExpanded(isExpanded)
    setNoteToAdd(prevNoteToAdd => ({
      ...prevNoteToAdd,
      type: type,
    }))
  }, [selectedIcon])

  function handleTextChange({ target: { value } }) {
    setNoteToAdd(prevNoteToAdd => {
      const updatedInfo = { ...prevNoteToAdd.info }
      if (prevNoteToAdd.type === 'NoteTxt') {
        updatedInfo.txt = value
      } else if (prevNoteToAdd.type === 'NoteImg') {
        updatedInfo.url = value
      } else if (prevNoteToAdd.type === 'NoteVideo') {
        const match = value.match(/[?&]v=([^&]+)/)
        if (match) {
          updatedInfo.url = `https://www.youtube.com/embed/${match[1]}`
        } else {
          updatedInfo.url = value
        }
      }
      return {
        ...prevNoteToAdd,
        info: updatedInfo,
      }
    })
  }

  function handleTitleChange({ target: { value } }) {
    setNoteToAdd(prevNoteToAdd => ({
      ...prevNoteToAdd,
      info: {
        ...prevNoteToAdd.info,
        title: value,
      },
    }))
  }

  function onPinNoteChange({ target: { classList } }) {
    classList.toggle('pinned-icon')
    classList.toggle('active')
    setNoteToAdd(prevNoteToAdd => ({
      ...prevNoteToAdd,
      isPinned: !prevNoteToAdd.isPinned,
    }))
  }

  return (
    <section className='add-note'>
      <React.Fragment>
        {isExpanded && (
          <div className='title-input'>
            <input
              value={info.title}
              ref={titleInputRef}
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              className='title'
              onChange={handleTitleChange}
            />
            <a className='material-icons-outlined icon icon-pin' onClick={onPinNoteChange} ref={pinIconRef}>
              push_pin
            </a>
          </div>
        )}
        <div className='content-input' ref={addNoteSectionRef}>
          <input
            ref={contentInputRef}
            value={info.txt || info.url}
            className='content'
            type='text'
            name='txt'
            id='content'
            title='Add a note'
            placeholder="What's on your mind ?"
            onChange={handleTextChange}
            onFocus={() => setIsExpanded(true)}
          />
          <div className='add-icons'>
            {Object.keys(icons).map(icon => (
              <a
                key={icon}
                className={`material-symbols-outlined icon ${selectedIcon === icon ? 'active' : ''}`}
                title={icons[icon].title}
                onClick={() => setSelectedIcon(icon)}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </React.Fragment>
    </section>
  )
}
