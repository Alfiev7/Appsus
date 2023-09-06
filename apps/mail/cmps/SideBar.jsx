
const {useEffect, useState } = React

import { SideBarComponent } from "./SideBarComponent.jsx"
import { sideBarService } from "../services/sidebar.service.js";


export function SideBar() {
    const [sideBarData, setSideBarData] = useState(null);

    useEffect(() => {
        sideBarService.getSideBarData().then(setSideBarData);
    }, []);

    if(!sideBarData) return <div>Loading...</div>


    return (
        <div className="sidebar">
            <button className="sidebar_compose">
                <i className="fa-regular fa-pen-to-square"></i> Compose </button>

                {sideBarData.map((data, index) => (
                <SideBarComponent
                    key={index}
                    icon={data.icon}
                    title={data.title}
                    number={data.number}
                />
            ))}
        </div>
    );
}

