const { useNavigate } = ReactRouterDOM

export function EmailRow({ id, title, subject, description, time, isRead, isChecked, toggleCheckbox, toggleIsStarred, isStarred, from, to, isDraft, onOpenDraft }) {
    const navigate = useNavigate();

    
    const handleRowClick = () => {
        if (isDraft) {
            onOpenDraft({
                id,
                title,
                subject,
                description,
            });
        } else {
            navigate(`EmailPreview/${id}`);
        }
    };
             
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
        return date.toLocaleString('en-US', options);
      }
            
        
    return (
        <div onClick={handleRowClick} className={`emailRow ${isRead ? 'read' : 'unread'}`}>

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
            {formatTimestamp(time)}
            </div>


        </div>
    )
}