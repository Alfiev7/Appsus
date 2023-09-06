const { useEffect, useState } = React


import { Section } from "./Section.jsx";
import { EmailRow } from "./EmailRow.jsx";
import { sectionService, emailIncoming } from "../services/emailList.service.js";


export function EmailList() {
    const [sectionData, setSectionData] = useState(null);
    const [emailRowData, setEmailRowData] = useState(null);

    useEffect(() => {
        sectionService.getSectionData().then(setSectionData);
        emailIncoming.getEmailRowData().then(setEmailRowData);
    }, []);


    if(!sectionData || !emailRowData) return <div>Loading...</div>

    return (

        <div className="EmailList">

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

                {emailRowData && emailRowData.map((data, index) => (
                    <EmailRow
                        key={index}
                        title={data.title}
                        subject={data.subject}
                        description={data.description}
                        time={data.time}
                    />
                ))}

            </div>

        </div>
    )
}



