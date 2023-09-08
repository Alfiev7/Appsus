const { useState, useEffect } = React
import { emailIncoming, updateEmail } from '../services/emailList.service.js';

export function EmailCompose({ show, onClose, addNewEmail, draftData }) {
  const [to, setTo] = useState(draftData && draftData.to ? draftData.to : '');
  const [subject, setSubject] = useState(draftData && draftData.subject ? draftData.subject : '');
  const [description, setDescription] = useState(draftData && draftData.description ? draftData.description : '');
  const [id, setId] = useState(draftData && draftData.id ? draftData.id : null);



  useEffect(() => {
    setTo(draftData && draftData.to ? draftData.to : '');
    setSubject(draftData && draftData.subject ? draftData.subject : '');
    setDescription(draftData && draftData.description ? draftData.description : '');
  }, [draftData]);


  useEffect(() => {
    if (!show) {
      return; 
    }
    const autoSave = setInterval(async () => {
      if (to || subject || description) {
        const newEmail = {
          id: id || Date.now(),
          title: "Alfie",
          from: 'alfie@gmail.com',
          to,
          subject,
          description,
          time: new Date().toString(),
          isRead: true,
          isStarred: false,
          isTrash: false,
          isDraft: true
        };
        try {
          if (id) {
            await emailIncoming.updateEmail(newEmail); 
          } else {
            await emailIncoming.saveEmail(newEmail);
            setId(newEmail.id);
          }
          addNewEmail(newEmail, id); 
        } catch (error) {
          console.error("Failed to autosave draft", error);
        }
      }
    }, 5000);
    return () => clearInterval(autoSave);
  }, [to, subject, description, id, addNewEmail, show]);
  
  if (!show) return null;

  const isNewEmail = !draftData || !draftData.id;

  const handleSend = async () => {
    const newEmail = {
      id: isNewEmail ? Date.now() : draftData.id,
      title: "Alfie",
      from: 'alfie@gmail.com',
      to,
      subject,
      description,
      time: new Date().toString(),
      isRead: true,
      isStarred: false,
      isTrash: false,
      isDraft: false
    };
    try {
      if (isNewEmail) {
        await emailIncoming.saveEmail(newEmail);
        addNewEmail(newEmail);
      } else {
        await addNewEmail(newEmail, draftData.id);
      }
      onClose();
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };


  const handleSaveDraft = async () => {
    const id = isNewEmail ? Date.now() : draftData.id;
    const newEmail = {
      id: Date.now(),
      title: "Alfie",
      from: 'alfie@gmail.com',
      to,
      subject,
      description,
      time: new Date().toString(),
      isRead: true,
      isStarred: false,
      isTrash: false,
      isDraft: true
    };
    try {
      if (!isNewEmail) {
        
        addNewEmail(null, draftData.id);
      }
  
      await emailIncoming.saveEmail(newEmail);
      addNewEmail(newEmail);
      onClose(); 
    } catch (error) {
      console.error("Failed to save draft", error);
    }
  };






  return (
    <div className="compose-container">
      <div className='compose-header'>
        <h3>New Email</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div className='compose-forms'>

        <input className='compose-to'
          type="text"
          placeholder="To:"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input className='compose-subject'
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea className='compose-message'
          placeholder="Message"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='compose-buttons'>
        <button onClick={handleSend}>SEND</button>
        <button onClick={handleSaveDraft}>DRAFT</button>
      </div>

    </div>
  );
}