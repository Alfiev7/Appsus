import { noteService } from '../services/note.service.js'
const { useState } = React

export function KeepHeader({ onSetFilterBy }) {
  const [selectedIcon, setSelectedIcon] = useState('')
  const icons = noteService.getIcons()

  function handleFilterByIcon(icon) {
    if (selectedIcon === icon) {
      setSelectedIcon('')
      onSetFilterBy('')
    } else {
      setSelectedIcon(icon)
      onSetFilterBy(icons[icon].type)
    }
  }

  function handleFilterByText({ target: { value } }) {
    if (selectedIcon) setSelectedIcon('')
    onSetFilterBy(value)
  }

  function renderIcons() {
    return Object.keys(icons).map(icon => (
      <a
        key={icon}
        className={`material-symbols-outlined icon ${
          selectedIcon === icon ? 'active' : ''
        }`}
        onClick={() => handleFilterByIcon(icon)}
      >
        {icon}
      </a>
    ))
  }

  return (
    <div className='keep-header'>
      <div className='keep-header-left'>
        <i className='fas fa-bars'></i>
        <img src='./assets/img/keep-logo.png' alt='' />
        <h1 className='keep-header-name'>Keep</h1>
      </div>

      <div className='keep-header-middle'>
        <i className='material-symbols-outlined'>search</i>

        <input
          placeholder='Search notes'
          type='text'
          onChange={handleFilterByText}
          className='searchHeader'
        />
        {renderIcons()}
      </div>

      <div className='keep-header-right'>
        <i className='material-symbols-outlined'>settings</i>
        <img src='./assets/img/user-yarin.jpeg' alt='' />
      </div>
    </div>
  )
}
