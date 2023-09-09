export function AppsMenu({ handleNavigate }) {
  return (
    <div className='apps-menu'>
      <img src='assets/img/home.png' onClick={() => handleNavigate('/')} alt='' />
      <img src='assets/img/gmail.png' onClick={() => handleNavigate('/mail')} alt='' />
      <img src='assets/img/keep-logo.png' alt='' onClick={() => handleNavigate('/note')} />
      <img src='assets/img/book.png' alt='' onClick={() => handleNavigate('/book')} />
    </div>
  )
}
