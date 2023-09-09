
export function SideBarComponent({ icon, title, number, onClick, isActive }) {
    return (
        <div className={`SideBarComponent ${isActive ? 'active' : ''}`} onClick={onClick}>
            <i className={icon}></i>
            <h3>{title}</h3>
            <h4>{number}</h4>
        </div>
    )
}
