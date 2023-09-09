const { useNavigate } = ReactRouterDOM

export function Home() {
  const navigate = useNavigate()
  function handleNavigate(path) {
    navigate(path)
  }
  return (
    <section className='home'>
      <div className='home-header'>
        <h1 className='home-main-name'>Alfsus</h1>
        <h1 className='home-main-header'>Your home, to everything</h1>
        <h4 className='home-sub-header'>Welcome home, we are glad to see you here</h4>
      </div>
      <img className='phones' src='assets/img/two-phones.png' alt='' />
      {/* <img className='iphone-notes' src='assets/img/iphone-notes.png' alt='' /> */}
      {/* <img className='iphone-email' src='assets/img/iphone-email.png' alt='' /> */}
      <div className='buttons-container'>
        <img src='assets/img/gmail.png' alt='' onClick={() => handleNavigate('/mail')} />
        <img src='assets/img/book.png' alt='' onClick={() => handleNavigate('/book')} />
        <img src='assets/img/keep-logo.png' alt='' onClick={() => handleNavigate('/note')} />
      </div>
    </section>
  )
}

// export function AppHeader() {
//   return (
//     <header className='app-header'>
//       <Link to='/'>
//         <h3>LOGO!</h3>
//       </Link>
//       <nav>
//         <NavLink to='/'>Home</NavLink>
//         <NavLink to='/about'>About</NavLink>
//         <NavLink to='/book'>Books</NavLink>
//         <NavLink to='/mail'>Mail</NavLink>
//         <NavLink to='/note'>Note</NavLink>
//       </nav>
//     </header>
//   )
// }
