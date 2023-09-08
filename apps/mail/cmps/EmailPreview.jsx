const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React 

import { emailIncoming, EMAILROWDATA_KEY } from "../services/emailList.service.js";




export function EmailPreview() {
  const { id } = useParams(); 
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate('/mail');
  };

  const deleteEmail = () => {
    emailIncoming.getEmailRowData()
      .then(data => {
        const remainingEmails = data.filter(email => email.id !== parseInt(id));
        emailIncoming.saveToStorage(EMAILROWDATA_KEY, remainingEmails);  
        goBackToHome();
      });
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
          
          

        </div>

        <div className="emailpreview-toolsright">


        </div>
      </div>
      <div className="emailpreview-body">

        <div className="emailpreview-bodyheader">

          <h2>{email.subject}</h2>
          <i className="material-icons-outlined">label_important</i>
          <p>{email.from}</p>
          <div className="time">{email.time}</div>

        </div>
        <div className="emailpreview-message">

         <p>{email.description}</p> 

        </div>


      </div>
    </div>
  )
}
