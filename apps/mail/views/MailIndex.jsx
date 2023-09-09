const { Routes, Route, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

import { Header } from '../cmps/Header.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { EmailPreview } from '../cmps/EmailPreview.jsx'
import { emailIncoming } from '../services/emailList.service.js'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { showSuccessMsg } from '../../../services/event-bus.service.js'


export function MailIndex() {
  const [emails, setEmails] = useState([])
  const [appliedFilter, setAppliedFilter] = useState('Inbox')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [draftData, setDraftData] = useState(null)
  const [isAscending, setIsAscending] = useState(true)
  const [hideTitles, setHideTitles] = useState(false)
  const [showTitlesAndNumbers, setShowTitlesAndNumbers] = useState(true)








  
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const title = queryParams.get('title')
    const content = queryParams.get('content')
    if (title && content) {
      setDraftData({
        id: Date.now(),
        title: 'Alfie',
        from: 'alfie@gmail.com',
        to: '',
        subject: title,
        description: content,
        time: Date.now(),
        isRead: true,
        isStarred: false,
        isTrash: false,
        isDraft: true,
        isFromNote: true,
      })
      setShowCompose(true)
    }
    emailIncoming
      .getEmailRowData()
      .then(fetchedEmails => {
        setEmails(fetchedEmails)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])
      

  const getAppliedFilterParameter = selectedItemTitle => {
    setAppliedFilter(selectedItemTitle)
  }

  const updateSearchKeyword = keyword => {
    setSearchKeyword(keyword)
  }

  const sortEmailsByDate = () => {
    const sortedEmails = [...emails].sort((a, b) => {
      const diff = a.time - b.time
      return isAscending ? diff : -diff
    })
    setEmails(sortedEmails)
    setIsAscending(!isAscending)
  }

  const sortEmailsByTitle = () => {
    const sortedEmails = [...emails].sort((a, b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()
      const firstLetterA = titleA.charAt(0)
      const firstLetterB = titleB.charAt(0)

      const diff = firstLetterA.localeCompare(firstLetterB)
      return isAscending ? diff : -diff
    })
    setEmails(sortedEmails)
    setIsAscending(!isAscending)
  }

  const getFilteredEmails = () => {
    switch (appliedFilter) {
      case 'Inbox':
        return emails.filter(email => email.from !== 'alfie@gmail.com' && email.isTrash === false)
      case 'Starred':
        return emails.filter(email => email.isStarred)
      case 'Sent':
        return emails.filter(
          email => email.from === 'alfie@gmail.com' && email.isDraft === false && email.isTrash === false
        )
      case 'Drafts':
        return emails.filter(email => email.isDraft && email.isTrash === false)
      case 'Trash':
        return emails.filter(email => email.isTrash)
      default:
        return emails
    }
  }

  const getSearchFilteredEmails = () => {
    let filteredEmails = getFilteredEmails()
    if (searchKeyword) {
      filteredEmails = filteredEmails.filter(
        email =>
          email.subject.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          email.description.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }
    return filteredEmails
  }

  const addNewEmail = (newEmail, draftId = null) => {
    if (draftId !== null) {
      setEmails(prevEmails => prevEmails.filter(email => email.id !== draftId))
    }
    if (newEmail !== null) {
      setEmails(prevEmails => [...prevEmails, newEmail])
    }
  }

  const handleComposeClick = () => {
    setDraftData(null)
    setShowCompose(true)
  }

  const handleCloseCompose = () => {
    setShowCompose(false)
  }

  const handleOpenDraft = draftEmail => {
    setDraftData(draftEmail)
    setShowCompose(true)
  }

  const toggleShowTitlesAndNumbers = () => {
    setShowTitlesAndNumbers(!showTitlesAndNumbers)
  }

  const addLabelToEmail = (emailId, label) => {
    setEmails(prevEmails =>
      prevEmails.map(email => {
        if (email.id === emailId) {
          const updatedEmail = { ...email, labels: [...email.labels, label] }
          console.log('Updated email with label:', updatedEmail) 
          showSuccessMsg('Label Added')
          return updatedEmail
        }
        return email
      })
    )
  }

  const removeLabelFromEmail = (emailId, label) => {
    setEmails(prevEmails =>
      prevEmails.map(email => {
        if (email.id === emailId) {
          return { ...email, labels: email.labels.filter(l => l !== label) }
        }
        return email
      })
    )
  }

  return (
    <div className='mailapp'>
    
      <Header
        updateSearchKeyword={updateSearchKeyword}
        toggleHideTitles={() => setHideTitles(!hideTitles)}
        toggleShowTitlesAndNumbers={toggleShowTitlesAndNumbers}
      />

      <div className='app_body'>
        <SideBar
          allEmails={emails}
          updateFilterByTitle={getAppliedFilterParameter}
          addNewEmail={addNewEmail}
          showCompose={showCompose}
          handleComposeClick={handleComposeClick}
          handleCloseCompose={handleCloseCompose}
          draftData={draftData}
          hideTitles={hideTitles}
          showTitlesAndNumbers={showTitlesAndNumbers}
          addLabelToEmail={addLabelToEmail}
          removeLabelFromEmail={removeLabelFromEmail}
        />
        <Routes>
          <Route
            path='/'
            element={
              <EmailList
                emails={emails}
                setEmails={setEmails}
                emailsAfterFilter={getSearchFilteredEmails()}
                handleOpenDraft={handleOpenDraft}
                sortEmailsByDate={sortEmailsByDate}
                sortEmailsByTitle={sortEmailsByTitle}
              />
            }
          />
          <Route path='/EmailPreview/:id' element={<EmailPreview />} />
        </Routes>
      </div>
      <UserMsg />
    </div>
  )
}
