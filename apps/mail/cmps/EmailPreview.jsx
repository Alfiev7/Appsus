const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React

import { emailIncoming, EMAILROWDATA_KEY } from '../services/emailList.service.js'

export function EmailPreview() {
  const { id } = useParams()
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  const goBackToHome = () => {
    navigate('/mail')
  }

  useEffect(() => {
    emailIncoming.getEmailRowData().then(data => {
      const foundEmail = data.find(email => email.id === parseInt(id))
      setEmail(foundEmail)
    })
  }, [id])

  if (!email) {
    return <div>Loading...</div>
  }

  function sendToNote() {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set('title', email.subject)
    queryParams.set('content', email.description)
    const newSearch = queryParams.toString()

    navigate('/note?' + newSearch)
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleString('en-US', options);
}

  return (
    <div className='emailpreview'>
      <div className='emailpreview-tools'>
        <div className='emailpreview-toolsleft'>
          <i className='material-icons-outlined' onClick={goBackToHome}  title='Go back to home'>
            arrow_back
          </i>
          <i className='material-symbols-outlined' onClick={() => sendToNote()} title='Save as note'>
            export_notes
          </i>
        </div>

        <div className='emailpreview-toolsright'></div>
      </div>

      <div className='emailpreview-body'>
        <div className='emailpreview-bodyheader'>
          <h2>{email.subject}</h2>
          <i className='material-icons-outlined'>label_important</i>
          <p>{email.from}</p>
          <div className='time'>{formatTimestamp(email.time)}</div>
        </div>

        <div className='emailpreview-message'>
          <p>{email.description}</p>
        </div>
      </div>
    </div>
  )
}
