const { useNavigate } = ReactRouterDOM





export function EmailRow({ id, title, subject, description, time, isRead }) {
    const navigate = useNavigate();
    console.log(id)
    return (
        <div onClick={() => navigate(`EmailPreview/${id}`)} className={`emailRow ${isRead ? 'read' : 'unread'}`}>

            <div className="emailRow_options">
                <i className="fa-regular fa-square"></i>
                <i className="fa-regular fa-star"></i>
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

