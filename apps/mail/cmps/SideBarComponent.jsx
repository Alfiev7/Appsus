
export function SideBarComponent({ icon, title, number, onClick }) {
    return (
        <div className="SideBarComponent" onClick={onClick}>
            <i className={icon}></i>
            <h3>{title}</h3>
            <p>{number}</p>
        </div>
    )
}