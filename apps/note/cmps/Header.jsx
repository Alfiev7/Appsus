export function Header({ onSetFilterBy }) {
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
          onChange={e => onSetFilterBy(e.target.value)}
          className='searchHeader'
        />
      </div>

      <div className='keep-header-right'>
        <i className='material-symbols-outlined'>settings</i>
        <img src='./assets/img/user-yarin.jpeg' alt='' />
      </div>
    </div>
  )
}
