const { useState } = React
import { emailIncoming } from '../services/emailList.service.js';

export function EmailCompose({ show, onClose, allEmails }) {
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
        allEmails.push(newEmail); 
        onClose();
    } catch (error) {
        console.error("Failed to save email", error);
    }
  };
  

   


  return (
    <div className="compose-container">
      <h2>New Email</h2>
      <input
        type="text"
        placeholder="To:"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
