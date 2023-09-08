
const {useEffect, useState } = React

import { SideBarComponent } from "./SideBarComponent.jsx"
import { sideBarService } from "../services/sidebar.service.js";
import { EmailCompose } from './EmailCompose.jsx';


export function SideBar({ allEmails, updateFilterByTitle, addNewEmail }) {
    const [sideBarData, setSideBarData] = useState(null);
    const [showCompose, setShowCompose] = useState(false);
    
     

    useEffect(() => {
        sideBarService.getSideBarData().then(setSideBarData);
    }, []);

    if(!sideBarData) return <div>Loading...</div>
  
    const handleSideBarItemClick = (selectedItemTitle) => {
        updateFilterByTitle(selectedItemTitle);
        
    }
    
    const handleComposeClick = () => {
            setShowCompose(true);
        };
        
        const handleCloseCompose = () => {
            setShowCompose(false);
        };


        const getEmailsCountByTitle = (title) => {
            
            switch(title) {
            case "Inbox": return allEmails.filter(email => email.isRead === false && email.isTrash === false).length;
            case "Starred": return allEmails.filter(email => email.isStarred === true && email.isTrash === false).length;
            case "Drafts": return allEmails.filter(email => email.isDraft === true && email.isTrash === false).length;
            case 'Sent': return allEmails.filter(email => email.from === 'alfie@gmail.com' && email.isTrash === false).length;
            case 'Trash': return allEmails.filter(email => email.isTrash === true).length;
            default: return 0;
        }
    }

    return (
        <div className="sidebar">
            <button className="sidebar_compose" onClick={handleComposeClick}>
                <i className="fa-regular fa-pen-to-square"></i> Compose </button>
                <EmailCompose show={showCompose} onClose={handleCloseCompose} addNewEmail={addNewEmail}  />

                {sideBarData.map((sideBarItemData) => (
                    <SideBarComponent onClick={() => handleSideBarItemClick(sideBarItemData.title)}
                    key={sideBarItemData.title}
                    icon={sideBarItemData.icon}
                    title={sideBarItemData.title}
                    number = {getEmailsCountByTitle(sideBarItemData.title)} 
                    />
                    ))}
        </div>
    );
}
