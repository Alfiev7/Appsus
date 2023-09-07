const { useEffect, useState } = React


import { Section } from "./Section.jsx";
import { EmailRow } from "./EmailRow.jsx";
import { storageService } from "../../../services/async-storage.service.js";
import { sectionService, emailIncoming, EMAILROWDATA_KEY } from "../services/emailList.service.js";
import {utilService} from "../../../services/util.service.js";


export function EmailList(  {emailsAfterFilter, emails, setEmails}) {
    const [sectionData, setSectionData] = useState(null);
    
    

    

    useEffect(() => {
        sectionService.getSectionData().then(setSectionData);
    }, []);
        

 

        
    const toggleAllCheckboxes = () => {
        const allChecked = emails.every(email => email.isChecked);
        const updatedEmails = emails.map(email => ({ ...email, isChecked: !allChecked }));
        setEmails(updatedEmails);
        utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails);
    };


    const toggleIsStarred = (id) => {
        const updatedEmails = emails.map(email => email.id === id ? { ...email, isStarred: !email.isStarred } : email);
        setEmails(updatedEmails);
        utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails);
    };
    



    const toggleCheckbox = (id) => {
        const updatedEmails = emails.map(email => email.id === id ? { ...email, isChecked: !email.isChecked } : email);
        setEmails(updatedEmails);
        utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails);
    };

    const markAsRead = () => {
        const updatedEmails = emails.map(email => email.isChecked ? { ...email, isRead: true } : email);
        setEmails(updatedEmails);
        utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails);
    };

    const removeSelectedEmails = () => {
        const remainingEmails = emails.filter(email => !email.isChecked);
        setEmails(remainingEmails);
        utilService.saveToStorage(EMAILROWDATA_KEY, remainingEmails);
    };
    

    const markAsUnread = () => {
        const updatedEmails = emails.map(email => email.isChecked ? { ...email, isRead: false } : email);
        setEmails(updatedEmails);
        utilService.saveToStorage(EMAILROWDATA_KEY, updatedEmails);
    };




    return (

        <div className="EmailList">

            <div className="emaillist-topbuttons">
                <span className="material-icons-outlined" onClick={toggleAllCheckboxes}>check_box_outline_blank</span>
                <span className="material-icons-outlined" onClick={markAsUnread}>markunread</span>
                <span className="material-icons-outlined" onClick={markAsRead}>mark_email_unread</span>
                <span className="material-icons-outlined" onClick={removeSelectedEmails}>delete_outline</span>
            </div>


            <div className="emaillist_sections">

                {sectionData && sectionData.map((data, index) => (
                    <Section
                        key={index}
                        icon={data.icon}
                        title={data.title}
                        color={data.color}
                    />
                ))}

            </div>

            <div className="emailList_list">

                {emailsAfterFilter && emailsAfterFilter.map((data, index) => (
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
                    />
                ))}

            </div>

        </div>
    )
}