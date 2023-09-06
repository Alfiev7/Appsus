const { useNavigate } = ReactRouterDOM

export function EmailRow({ id, title, subject, description, time, isRead, isChecked, toggleCheckbox, toggleIsStarred, isStarred }) {
    const navigate = useNavigate();

    
    return (
        <div onClick={() => navigate(`EmailPreview/${id}`)} className={`emailRow ${isRead ? 'read' : 'unread'}`}>

            <div className="emailRow_options">
                <span onClick={e => { e.stopPropagation(); toggleCheckbox(id); }}>
                    {isChecked ?
                        <i className="material-icons-outlined">check_box</i> :
                        <i className="material-icons-outlined">check_box_outline_blank</i>
                    }
                </span>
                <span onClick={e => { e.stopPropagation(); toggleIsStarred(id); }}>
                    {isStarred ?
                        <i className="fa-solid fa-star" style={{color: '#ffdd00'}}></i> :
                        <i className="fa-regular fa-star"></i>
                    }
                </span>
                
            </div>



            <h3 className="emailRow_title">
                {title}
            </h3>



            <div className="emailRow_message">
                <h4>{subject}{" "}
                    <span className="emailRow_description">-
                        {" "}{description} </span>
                </h4>
            </div>


            <div className="emailRow_time">
                {time}
            </div>


        </div>
    )
}