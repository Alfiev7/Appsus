const { useEffect, useState } = React


import { Section } from "./Section.jsx";
import { EmailRow } from "./EmailRow.jsx";
import { storageService } from "../../../services/async-storage.service.js";
import { sectionService, emailIncoming, EMAILROWDATA_KEY, saveToStorage } from "../services/emailList.service.js";


export function EmailList() {
    const [sectionData, setSectionData] = useState(null);
    const [emailRowData, setEmailRowData] = useState(null);
    const [emails, setEmails] = useState([]);
    

    useEffect(() => {
        sectionService.getSectionData().then(setSectionData);
        emailIncoming.getEmailRowData().then(data => {
            setEmailRowData(data);
            setEmails(data);
        });
    }, []);
            

        useEffect(() => {
            emailIncoming.saveToStorage(EMAILROWDATA_KEY, emails); 
        }, [emails]);

        
    const toggleAllCheckboxes = () => {
        const allChecked = emails.every(email => email.isChecked);
        setEmails(emails.map(email => ({ ...email, isChecked: !allChecked })));
    };


    const toggleCheckbox = (id) => {
        setEmails(emails.map(email => email.id === id ? { ...email, isChecked: !email.isChecked } : email));
    };

    const markAsRead = () => {
        setEmails(emails.map(email => email.isChecked ? { ...email, isRead: true } : email));
    };

    const removeSelectedEmails = () => {
        const remainingEmails = emails.filter(email => !email.isChecked);
        setEmails(remainingEmails);
    };
    

    const markAsUnread = () => {
        setEmails(emails.map(email => email.isChecked ? { ...email, isRead: false } : email));
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

                {emailRowData && emails.map((data, index) => (
                    <EmailRow
                        key={index}
                        id={data.id}
                        title={data.title}
                        subject={data.subject}
                        description={data.description}
                        time={data.time}
                        isRead={data.isRead}
                        isChecked={data.isChecked}
                        toggleCheckbox={toggleCheckbox}
                        removedAt={data.removedAt}
                        from={data.from}
                        to={data.to}
                    />
                ))}

            </div>

        </div>
    )
}



