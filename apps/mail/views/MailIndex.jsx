const { Routes, Route } = ReactRouterDOM
const { useState, useEffect } = React

import { Header } from "../cmps/Header.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailPreview } from "../cmps/EmailPreview.jsx";
import { emailIncoming } from "../services/emailList.service.js";





export function MailIndex() {
    const [emails, setEmails] = useState([]);
    const [appliedFilter, setAppliedFilter] = useState('')


    useEffect(() => {
        emailIncoming.getEmailRowData()
            .then(fetchedEmails => {
                setEmails(fetchedEmails);



            })
            .catch(error => {
                console.error('Failed to fetch emails:', error);
            });
    }, [emails]);



    const getAppliedFilterParameter = (selectedItemTitle) => {
        setAppliedFilter(selectedItemTitle)
    }




    const getFilteredEmails = () => {

        switch (appliedFilter) {


            
            case 'Inbox': return emails.filter(email => email.from !== 'alfie@gmail.com');
            case 'Starred': return emails.filter(email => email.isStarred);
            case 'Sent': return emails.filter(email => email.from === 'alfie@gmail.com');
            case 'Drafts': return emails.filter(email => email.isDraft);
            case 'Trash': return emails.filter(email => email.isTrash);
            default: return emails;
        }
    }





    return (

        <div className="mailapp">
            <Header />

            <div className="app_body">
                <SideBar
                    allEmails={emails}
                    updateFilterByTitle={(e) => getAppliedFilterParameter(e)} />


                    
                <Routes>
                    <Route path="/" element={<EmailList emailsAfterFilter={getFilteredEmails()} />} />
                    <Route path="/EmailPreview/:id" element={<EmailPreview />} />
                </Routes>
            </div>
        </div>
    )
}



