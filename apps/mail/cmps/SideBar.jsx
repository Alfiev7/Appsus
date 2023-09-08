
const { useEffect, useState } = React

import { SideBarComponent } from "./SideBarComponent.jsx"
import { sideBarService } from "../services/sidebar.service.js";
import { EmailCompose } from './EmailCompose.jsx';
import { EmailList } from './EmailList.jsx';


export function SideBar({ allEmails, updateFilterByTitle, addNewEmail, showCompose, handleCloseCompose, handleComposeClick, draftData }) {
    const [sideBarData, setSideBarData] = useState(null);
    




    useEffect(() => {
        sideBarService.getSideBarData().then(setSideBarData);

    }, []);



    if (!sideBarData) return <div>Loading...</div>

    const handleSideBarItemClick = (selectedItemTitle) => {
        const updatedSideBarData = sideBarData.map((item) => ({
            ...item,
            isActive: item.title === selectedItemTitle,
        }));
        setSideBarData(updatedSideBarData);
        updateFilterByTitle(selectedItemTitle);
    }


    const getEmailsCountByTitle = (title) => {

        switch (title) {
            case "Inbox": return allEmails.filter(email => email.isRead === false && email.isTrash === false).length;
            case "Starred": return allEmails.filter(email => email.isStarred === true && email.isTrash === false).length;
            case "Drafts": return allEmails.filter(email => email.isDraft === true && email.isTrash === false).length;
            case 'Sent': return allEmails.filter(email => email.from === 'alfie@gmail.com' && email.isTrash === false && email.isDraft === false).length;
            case 'Trash': return allEmails.filter(email => email.isTrash === true).length;
            default: return 0;
        }
    }

    return (
        <div className="sidebar">
            <button className="sidebar_compose" onClick={handleComposeClick}>

                <i className="fa-regular fa-pen-to-square"></i> Compose </button>
            <EmailCompose show={showCompose} onClose={handleCloseCompose} addNewEmail={addNewEmail} draftData={draftData} />

            {sideBarData.map((sideBarItemData) => (
                <SideBarComponent onClick={() => handleSideBarItemClick(sideBarItemData.title)}
                    key={sideBarItemData.title}
                    icon={sideBarItemData.icon}
                    title={sideBarItemData.title}
                    number={getEmailsCountByTitle(sideBarItemData.title)}
                    isActive={sideBarItemData.isActive}
                />
            ))}


            <div className="sidebar-labels">
                <h2>Labels</h2>

                <div className="critical">
                    <span className="material-symbols-outlined">label</span>
                    <h3>Critical</h3>
                </div>

                <div className="family">
                    <span className="material-symbols-outlined">label</span>
                    <h3>Family</h3>
                </div>

                <div className="work">
                    <span className="material-symbols-outlined">label</span>
                    <h3>Work</h3>
                </div>

                <div className="memories">
                    <span className="material-symbols-outlined">label</span>
                    <h3>Memories</h3>
                </div>




            </div>
        </div>

    );
}
