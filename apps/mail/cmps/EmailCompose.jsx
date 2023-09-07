const { useState } = React
import { emailIncoming } from '../services/emailList.service.js';

export function EmailCompose({ show, onClose, addNewEmail }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  if (!show) return null;

  const handleSend = async () => {
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
      isDraft: false
    };
    try {
      await emailIncoming.saveEmail(newEmail);
      addNewEmail(newEmail);
      onClose();
    } catch (error) {
      console.error("Failed to save email", error);
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
        placeholder=""
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        </div>

      <div className='compose-buttons'>
      <button onClick={handleSend}>SEND</button>
      </div>

    </div>
  );
}
