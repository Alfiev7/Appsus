
export function Section({ Icon, title, color,}) {
    return (
        <div className="section"

            style={{
                borderBottom: `3px solid ${color}`,
                
            }}
        >
            <i className={Icon}></i>
            <h4>{title}</h4>
        </div>
    );
}

