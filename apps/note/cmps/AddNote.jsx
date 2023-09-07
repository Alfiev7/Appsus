const { useState, useRef, useEffect } = React
import { noteService } from '../services/note.service.js'

export function AddNote({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState('add_notes')
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const titleInputRef = useRef(null)
  const addNoteSectionRef = useRef(null)
  const contentInputRef = useRef(null)
  const icons = noteService.getIcons()

  useEffect(() => {
    function handleClickOutside({ target }) {
      if (
        addNoteSectionRef.current &&
        addNoteSectionRef.current.contains(target)
      )
        return
      if (isExpanded) {
        if (titleInputRef.current && !titleInputRef.current.contains(target)) {
          if (
            noteToAdd.info.txt ||
            noteToAdd.info.title ||
            noteToAdd.info.url
          ) {
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
    contentInputRef.current.disabled = disabled
    setIsExpanded(isExpanded)

    setNoteToAdd(prevNoteToAdd => ({
      ...prevNoteToAdd,
      type: type,
    }))
  }, [selectedIcon])

  function handleTextChange({ target: { value } }) {
    console.log('noteToAdd.type', noteToAdd.type)
    if (noteToAdd.type === 'NoteTxt')
      setNoteToAdd(prevNoteToAdd => ({
        ...prevNoteToAdd,
        info: {
          ...prevNoteToAdd.info,
          txt: value,
        },
      }))
    if (noteToAdd.type === 'NoteImg')
      setNoteToAdd(prevNoteToAdd => ({
        ...prevNoteToAdd,
        info: {
          ...prevNoteToAdd.info,
          url: value,
        },
      }))
    if (noteToAdd.type === 'NoteVideo')
      setNoteToAdd(prevNoteToAdd => ({
        ...prevNoteToAdd,
        info: {
          ...prevNoteToAdd.info,
          url: `https://www.youtube.com/embed/${
            value.match(/[?&]v=([^&]+)/)[1]
          }`,
        },
      }))
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

  // const icons = {
  //   add_notes: {
  //     type: 'NoteTxt',
  //     placeholder: "What's on your mind ?",
  //     disabled: false,
  //     isExpanded: false,
  //   },
  //   check_box: {
  //     type: 'NoteTodos',
  //     placeholder: 'Add todos title',
  //     disabled: true,
  //     isExpanded: true,
  //   },
  //   image: {
  //     type: 'NoteImg',
  //     placeholder: 'Add image url',
  //     disabled: false,
  //     isExpanded: true,
  //   },
  //   slideshow: {
  //     type: 'NoteVideo',
  //     placeholder: 'Add video url',
  //     disabled: false,
  //     isExpanded: true,
  //   },
  //   brush: {
  //     type: 'NoteCanvas',
  //     placeholder: 'Add brush content',
  //     disabled: false,
  //     isExpanded: true,
  //   },
  // }

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
        <div className='content-input' ref={addNoteSectionRef}>
          <input
            ref={contentInputRef}
            value={noteToAdd.info.txt || noteToAdd.info.url}
            className='content'
            type='text'
            name='txt'
            id='content'
            placeholder="What's on your mind ?"
            onChange={handleTextChange}
            onFocus={() => setIsExpanded(true)}
          />
          {Object.keys(icons).map(icon => (
            <a
              key={icon}
              className={`material-symbols-outlined icon ${
                selectedIcon === icon ? 'active' : ''
              }`}
              onClick={() => setSelectedIcon(icon)}
            >
              {icon}
            </a>
          ))}
        </div>
        {/* {isExpanded && <section className='actions'>Actions Area (??)</section>} */}
      </React.Fragment>
    </section>
  )
}
