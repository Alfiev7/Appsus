
const { Routes, Route, Navigate } = ReactRouterDOM

import { Header } from "../cmps/Header.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailPreview } from "../cmps/EmailPreview.jsx";



export function MailIndex() {
    return (

        <div className="mailapp"> 
            <Header />

            <div className="app_body">
                <SideBar />

                <Routes>
                    <Route path="/" element={<EmailList />} />
                    <Route path="/EmailPreview" element={<EmailPreview />} />
                    <Route path="/EmailPreview/:id" element={<EmailPreview />} />
                </Routes>
            </div>
        </div>


    )
}



