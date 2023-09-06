const { useNavigate } = ReactRouterDOM




export function EmailPreview() {
  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate('/mail');
  };

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

          <h2>Subject</h2>
          <i className="material-icons-outlined">label_important</i>
          <p>(david@testing.com)</p>
          <div className="time">Monday 17th Febuary 2023 18:30 PM </div>

        </div>
        <div className="emailpreview-message">

         <p>This is a message for testing body of email</p> 
         
        </div>


      </div>
    </div>
  )
}
