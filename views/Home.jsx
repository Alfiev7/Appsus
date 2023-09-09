export function Home() {
  return (
    <section className='home'>
      <div className='home-header'>
        <h1 className='home-main-header'>Alfsus - Your home, to everything</h1>
        <h4 className='home-sub-header'>Welcome home, we are glad to see you here</h4>
      </div>
      <div className='img-container'>
        <img className='iphone-notes' src='assets/img/iphone-notes.png' alt='' />
        <img className='iphone-email' src='assets/img/iphone-email.png' alt='' />
      </div>
      {/* <img src='../assets/img/phone1.png' alt='' />
      <img src='../assets/img/phone2.png' alt='' />
      <img src='../assets/img/phone3.png' alt='' />
      <img src='../assets/img/phone4.png' alt='' /> */}
    </section>
  )
}
