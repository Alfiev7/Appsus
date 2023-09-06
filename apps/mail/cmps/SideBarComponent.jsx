
export function SideBarComponent({ icon, title, number }) {
    return (
        <div className="SideBarComponent">
            <i className={icon}></i>
            <h3>{title}</h3>
            <p>{number}</p>
        </div>
    )
}