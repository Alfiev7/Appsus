const { useState } = React

export function Header({ updateSearchKeyword, toggleHideTitles, toggleShowTitlesAndNumbers }) {
  const [hideTitles, setHideTitles] = useState(false);

  const handleToggleHideTitles = () => {
    setHideTitles(!hideTitles);
    toggleHideTitles(); 
  };

  const handleToggleShowTitlesAndNumbers = () => {
    toggleShowTitlesAndNumbers();
    handleToggleHideTitles()
  };

  return (
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
      <i className="fa-solid fa-sun"></i>
      <img src="./assets/img/profile.png" alt="" />
      </div>
    </div>
  )
}

export default Header