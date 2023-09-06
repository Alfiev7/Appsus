const { useState, useRef, useEffect } = React
import { noteService } from '../services/note.service.js'

export function AddNote({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const titleInputRef = useRef(null)
  const contentInputRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (isExpanded) {
        if (
          titleInputRef.current &&
          !titleInputRef.current.contains(event.target)
        ) {
          if (noteToAdd.info.txt) {
            onAddNote(noteToAdd)
          }
          setIsExpanded(false)
          setNoteToAdd(noteService.getEmptyNote())
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded, noteToAdd, onAddNote])

  function handleTextChange(event) {
    const value = event.target.value
    setNoteToAdd(prevNoteToAdd => ({
      ...prevNoteToAdd,
      info: {
        ...prevNoteToAdd.info,
        txt: value,
      },
    }))
  }

  function handleTitleChange(event) {
    const value = event.target.value
    setNoteToAdd(prevNoteToAdd => ({
      ...prevNoteToAdd,
      info: {
        ...prevNoteToAdd.info,
        title: value,
      },
    }))
  }

  return (
    <section className='add-note'>
      <React.Fragment>
        {isExpanded && (
          <div className='title-input'>
            <input
              value={noteToAdd.info.title}
              ref={titleInputRef}
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              className='title'
              onChange={handleTitleChange}
            />
            <a className='material-icons-outlined pin'>push_pin</a>
          </div>
        )}
        <input
          value={noteToAdd.info.txt}
          ref={contentInputRef}
          className='content'
          type='text'
          name='txt'
          id='content'
          placeholder="What's on your mind?"
          onChange={handleTextChange}
          onFocus={() => setIsExpanded(true)}
        />
        {isExpanded && <section className='actions'></section>}
      </React.Fragment>
    </section>
  )
}
