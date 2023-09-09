const { useEffect, useState } = React

import { Section } from './Section.jsx'
import { EmailRow } from './EmailRow.jsx'
import { sectionService, EMAILROWDATA_KEY } from '../services/emailList.service.js'
import { utilService } from '../../../services/util.service.js'
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { showSuccessMsg } from '../../../services/event-bus.service.js'


export function EmailList({
  emailsAfterFilter,
  emails,
  setEmails,
  handleOpenDraft,
  sortEmailsByDate,
  sortEmailsByTitle,
}) {
  const [sectionData, setSectionData] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Primary')

  useEffect(() => {
    sectionService.getSectionData().then(data => {
      setSectionData(data || [])
    })
  }, [])

  const toggleAllCheckboxes = () => {
    const allChecked = emailsAfterFilter.every(email => email.isChecked)
    const updatedEmails = emails.map(email => {
      if (emailsAfterFilter.some(filteredEmail => filteredEmail.id === email.id)) {
        return { ...email, isChecked: !allChecked }
      }
      return email
    })
    setEmails(updatedEmails)
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails)
    showSuccessMsg('All emails toggled!')
  }
  const toggleIsStarred = id => {
    const updatedEmails = emails.map(email => (email.id === id ? { ...email, isStarred: !email.isStarred } : email))
    setEmails(updatedEmails)
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails)
    showSuccessMsg('Email starred!')
  }

  const toggleCheckbox = id => {
    const updatedEmails = emails.map(email => (email.id === id ? { ...email, isChecked: !email.isChecked } : email))
    setEmails(updatedEmails)
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails)
  }

  const markAsRead = () => {
    const updatedEmails = emails.map(email => (email.isChecked ? { ...email, isRead: true, isChecked: false } : email))
    setEmails(updatedEmails)
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails)
    showSuccessMsg('Email marked as read!')
  }

  const markAsReadById = (id) => {
    const updatedEmails = emails.map(email => {
      if(email.id === id) {
        return { ...email, isRead: true };
      }
      return email;
    });
    setEmails(updatedEmails);
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails);
    showSuccessMsg('Email marked as read!');
  };

  const markAsUnread = () => {
    const updatedEmails = emails.map(email => (email.isChecked ? { ...email, isRead: false, isChecked: false } : email))
    setEmails(updatedEmails)
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails)
    showSuccessMsg('Email marked as unread!')
  }

  const markasTrash = () => {
    const flaggedForRemoval = []
    const updatedEmails = emails
      .map(email => {
        if (email.isChecked) {
          if (email.isTrash) {
            flaggedForRemoval.push(email.id)
            return null
          } else {
            return { ...email, isTrash: true, isChecked: false }
          }
        }
        return email
      })
      .filter(email => email !== null)
    setEmails(updatedEmails)
    utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails)
    showSuccessMsg('Email trashed!')

  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleActiveSection = sectionTitle => {
    setActiveSection(sectionTitle === activeSection ? null : sectionTitle)
  }



  return (
    <div className='emailList'>
      <div className='emaillist-topbuttons'>
        <span className='material-icons-outlined' onClick={toggleAllCheckboxes} title='Check All'>
          check_box_outline_blank
        </span>
        <span className='material-icons-outlined' onClick={markAsUnread} title='Mark Unread'>
          markunread
        </span>
        <span className='material-icons-outlined' onClick={markAsRead} title='Mark Read'>
          mark_email_unread
        </span>
        <span className='material-icons-outlined' onClick={markasTrash} title='Trash'>
          delete_outline
        </span>
        <span className='material-symbols-outlined' onClick={toggleDropdown} title='Sort by'>
          filter_list
        </span>
        {isDropdownOpen && (
          <div className='dropdown'>
            <span className='material-symbols-outlined' onClick={sortEmailsByDate} title='Sort by date'>
              timer
            </span>
            <span className='material-symbols-outlined' onClick={sortEmailsByTitle} title='Sort by Sender'>
              title
            </span>
          </div>
        )}
      </div>

      <div className='emaillist-sections'>
        {sectionData &&
          sectionData.map((data, index) => (
            <Section
              key={index}
              Icon={data.Icon}
              title={data.title}
              color={data.color}
              isActive={data.title === activeSection}
              onToggle={toggleActiveSection}
            />
          ))}
      </div>

      <div className='emailList-list'>
        {emailsAfterFilter &&
          emailsAfterFilter.map((data, index) => (
            <EmailRow
              key={index}
              id={data.id}
              title={data.title}
              subject={data.subject}
              description={data.description}
              time={data.time}
              isRead={data.isRead}
              isChecked={data.isChecked}
              isStarred={data.isStarred}
              toggleCheckbox={toggleCheckbox}
              toggleIsStarred={toggleIsStarred}
              removedAt={data.removedAt}
              from={data.from}
              to={data.to}
              isDraft={data.isDraft}
              onOpenDraft={handleOpenDraft}
              markasTrash={markasTrash}
              labels={data.labels}
              markAsReadById={() => markAsReadById(data.id)}
            />
          ))}
      </div>
      <UserMsg />
    </div>
  )
}
