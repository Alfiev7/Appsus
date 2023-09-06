const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React 

import { emailIncoming } from "../services/emailList.service.js";


export function EmailPreview() {
  const { id } = useParams(); 
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate('/mail');
  };

  useEffect(() => {
    emailIncoming.getEmailRowData()
        .then(data => {
            const foundEmail = data.find(email => email.id === parseInt(id));
            setEmail(foundEmail);
        });
}, [id]);

if (!email) {
  return <div>Loading...</div>;
}

  return (
    <div className="emailpreview">
      <div className="emailpreview-tools">

        <div className="emailpreview-toolsleft">

          <i className="material-icons-outlined" onClick={goBackToHome}>arrow_back</i>
          <i className="material-icons-outlined">delete</i>
          <i className="material-icons-outlined">mark_email_unread</i>

        </div>

        <div className="emailpreview-toolsright">

          <i className="material-icons-outlined">reply</i>
          <i className="material-icons-outlined">star_border</i>

        </div>
      </div>
      <div className="emailpreview-body">

        <div className="emailpreview-bodyheader">

          <h2>{email.subject}</h2>
          <i className="material-icons-outlined">label_important</i>
          <p>{email.from}</p>
          <div className="time">Monday 17th Febuary 2023 18:30 PM </div>

        </div>
        <div className="emailpreview-message">

         <p>{email.description}</p> 

        </div>


      </div>
    </div>
  )
}
