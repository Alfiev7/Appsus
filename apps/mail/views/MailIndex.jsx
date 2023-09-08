const { Routes, Route } = ReactRouterDOM
const { useState, useEffect } = React

import { Header } from "../cmps/Header.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailPreview } from "../cmps/EmailPreview.jsx";
import { emailIncoming } from "../services/emailList.service.js";

export function MailIndex() {
    const [emails, setEmails] = useState([]);
    const [appliedFilter, setAppliedFilter] = useState('Inbox')
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showCompose, setShowCompose] = useState(false);
    const [draftData, setDraftData] = useState(null);



    useEffect(() => {
        emailIncoming.getEmailRowData()
            .then(fetchedEmails => {
                setEmails(fetchedEmails);
            })
            .catch(error => {
            });
    }, []);

    const getAppliedFilterParameter = (selectedItemTitle) => {
        setAppliedFilter(selectedItemTitle)
    }


    const updateSearchKeyword = (keyword) => {
        setSearchKeyword(keyword);
    }


        
      

    
    const getFilteredEmails = () => {
        switch (appliedFilter) {
            case 'Inbox': return emails.filter(email => email.from !== 'alfie@gmail.com' && email.isTrash === false);
            case 'Starred': return emails.filter(email => email.isStarred);
            case 'Sent': return emails.filter(email => email.from === 'alfie@gmail.com' && email.isDraft === false && email.isTrash === false);
            case 'Drafts': return emails.filter(email => email.isDraft && email.isTrash === false);
            case 'Trash': return emails.filter(email => email.isTrash);
            default: return emails;
        }
    }

    const getSearchFilteredEmails = () => {
        let filteredEmails = getFilteredEmails();;
        if (searchKeyword) {
            filteredEmails = filteredEmails.filter(email =>
                email.subject.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                email.description.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }
        return filteredEmails;
    };

    const addNewEmail = (newEmail, draftId = null) => {
        if (draftId !== null) {
            setEmails(prevEmails => prevEmails.filter(email => email.id !== draftId));
        }
        if (newEmail !== null) {
            setEmails(prevEmails => [...prevEmails, newEmail]);
        }
    };

        

      
    const handleComposeClick = () => {
        setDraftData(null);
        setShowCompose(true);
    };

    const handleCloseCompose = () => {
        setShowCompose(false);
    };

    const handleOpenDraft = (draftEmail) => {
        setDraftData(draftEmail);
        setShowCompose(true);
    };

    return (

        <div className="mailapp">
            <Header updateSearchKeyword={updateSearchKeyword} />

            <div className="app_body">
                <SideBar
                    allEmails={emails}
                    updateFilterByTitle={getAppliedFilterParameter}
                    addNewEmail={addNewEmail}
                    showCompose={showCompose}
                    handleComposeClick={handleComposeClick}
                    handleCloseCompose={handleCloseCompose}
                    draftData={draftData}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <EmailList
                                emails={emails}
                                setEmails={setEmails}
                                emailsAfterFilter={getSearchFilteredEmails()}
                                handleOpenDraft={handleOpenDraft} 
                            />
                        }
                    />
                    <Route path="/EmailPreview/:id" element={<EmailPreview />} />
                </Routes>
            </div>
        </div>
    )
}





