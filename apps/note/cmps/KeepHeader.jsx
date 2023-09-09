import { AppsMenu } from '../../../cmps/AppsMenu.jsx'
import { noteService } from '../services/note.service.js'
const { useState } = React
const { useNavigate } = ReactRouterDOM

export function KeepHeader({ onSetFilterBy }) {
  const [selectedIcon, setSelectedIcon] = useState('')
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const icons = noteService.getIcons()
  const navigate = useNavigate()

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
        className={`material-symbols-outlined icon ${selectedIcon === icon ? 'active' : ''}`}
        title={icons[icon].title}
        onClick={() => handleFilterByIcon(icon)}
      >
        {icon}
      </a>
    ))
  }

  function handleNavigate(path) {
    navigate(path)
  }

  return (
    <React.Fragment>
      <div className='keep-header'>
        <div className='keep-header-left'>
          <i className='fas fa-bars'></i>
          <img src='./assets/img/keep-logo.png' alt='' />
          <h1 className='keep-header-name'>Keep</h1>
        </div>

        <div className='keep-header-middle'>
          <div className='search-input-container'>
            <i className='material-symbols-outlined'>search</i>
            <input placeholder='Search notes' type='text' onChange={handleFilterByText} className='searchHeader' />
          </div>
          <div className='icons-container'>{renderIcons()}</div>
        </div>

        <div className='keep-header-right'>
          <i className='material-symbols-outlined icon-apps' onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
            apps
          </i>
          <img src='./assets/img/user-yarin.jpeg' alt='' />
        </div>
      </div>
      {isMenuExpanded && <AppsMenu handleNavigate={handleNavigate} />}
    </React.Fragment>
  )
}
