const { useNavigate } = ReactRouterDOM
import { EmailPreview } from "./EmailPreview.jsx";




export function EmailRow({ id, title, subject, description, time, }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('EmailPreview')} className="emailRow">

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

