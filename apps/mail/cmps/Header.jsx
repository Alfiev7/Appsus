
import { AppsMenu } from '../../../cmps/AppsMenu.jsx'
const { useState } = React
const { useNavigate } = ReactRouterDOM

export function Header({ updateSearchKeyword, toggleHideTitles, toggleShowTitlesAndNumbers }) {
  const [hideTitles, setHideTitles] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  const handleToggleHideTitles = () => {
    setHideTitles(!hideTitles);
    toggleHideTitles(); 
  };

  const handleToggleShowTitlesAndNumbers = () => {
    toggleShowTitlesAndNumbers();
    handleToggleHideTitles()
  };

  function handleNavigate(path) {
    navigate(path)
  }

  return (
    <React.Fragment>

 
    <div className='header'>
      <div className="header_left">
      <i className="fas fa-bars" onClick={handleToggleShowTitlesAndNumbers}></i>

      <img src="./assets/img/gmail.png" alt="" />
      </div>

      <div className="header_middle">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input placeholder="Search mail" type="text" onChange={e => updateSearchKeyword(e.target.value)} className="searchHeader" />
      </div>

      <div className="header_right">
      <i className='material-symbols-outlined icon-apps' onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
            apps
          </i>
      <img src="./assets/img/profile.png" alt="" />
      </div>
    </div>
    {isMenuExpanded && <AppsMenu handleNavigate={handleNavigate} />}
    </React.Fragment>
  )
}

export default Header