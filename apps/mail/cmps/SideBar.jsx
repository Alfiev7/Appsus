
const {useEffect, useState } = React

import { SideBarComponent } from "./SideBarComponent.jsx"
import { sideBarService } from "../services/sidebar.service.js";


export function SideBar({ allEmails, updateFilterByTitle }) {
    const [sideBarData, setSideBarData] = useState(null);

    useEffect(() => {
        sideBarService.getSideBarData().then(setSideBarData);
    }, []);

    if(!sideBarData) return <div>Loading...</div>




    const getEmailsCountByTitle = (title) => {
        
        switch(title) {
        case "Inbox": return allEmails.filter(email => email.isRead === false).length;
        case "Starred": return allEmails.filter(email => email.isStarred === true).length;
        case "Drafts": return allEmails.filter(email => email.isDraft === true).length;
        case 'Sent': return allEmails.filter(email => email.from === 'alfie@gmail.com').length;
        default: return 0;
    }
}
        

        const handleSideBarItemClick = (selectedItemTitle) => {
            console.log(selectedItemTitle)
            updateFilterByTitle(selectedItemTitle);
        }
    


    return (
        <div className="sidebar">
            <button className="sidebar_compose">
                <i className="fa-regular fa-pen-to-square"></i> Compose </button>

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