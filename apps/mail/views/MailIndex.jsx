
const { Routes, Route, Navigate } = ReactRouterDOM
const { useState,useEffect } = React

import { Header } from "../cmps/Header.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailPreview } from "../cmps/EmailPreview.jsx";
import { emailIncoming } from "../services/emailList.service.js";





export function MailIndex() {
    const [emails, setEmails] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
  
    useEffect(() => {
        emailIncoming.getEmailRowData()
          .then(fetchedEmails => {
            setEmails(fetchedEmails);
        
            const newUnreadCount = fetchedEmails.filter(email => !email.isRead).length;
            setUnreadCount(newUnreadCount);
          })
          .catch(error => {
            console.error('Failed to fetch emails:', error);
          });
    }, [emails]);




    return (

        <div className="mailapp"> 
            <Header />

            <div className="app_body">
                <SideBar unreadCount={unreadCount} /> 

                <Routes>
                    <Route path="/" element={<EmailList />} />
                    <Route path="/EmailPreview" element={<EmailPreview />} />
                    <Route path="/EmailPreview/:id" element={<EmailPreview />} />
                </Routes>
            </div>
        </div>


    )
}




