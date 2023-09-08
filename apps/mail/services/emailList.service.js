import { storageService } from "../../../services/async-storage.service.js";
import {utilService} from "../../../services/util.service.js";

const SECTIONDATA_KEY = 'SECTIONDATA_DB'
export const EMAILROWDATA_KEY = 'EMAILROW_DB'



const sectionData = [
    {
        Icon: "fa-solid fa-inbox",
        title: "Primary",
        color: "red"
    },
    {
        Icon: "fa-solid fa-tag",
        title: "Promotion",
        color: "blue"
    },
    {
        Icon: "fa-solid fa-user-group",
        title: "Social",
        color: "green"
    }
];

export const sectionService = {
    getSectionData,
}

_createSectionData()

function getSectionData(){
    return storageService.query(SECTIONDATA_KEY).then(sectionData => sectionData)
}


function _createSectionData() {
    let data = utilService.loadFromStorage(SECTIONDATA_KEY)
    if (!data || !data.length) {
      data = sectionData
      utilService.saveToStorage(SECTIONDATA_KEY, data)
    }
  }




  function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dateString = new Intl.DateTimeFormat('en-US', options).format(date);
    return dateString;
}
const now = new Date();
  

    
  

  

const emailRowData = [
    {
        id: 1,
        title: "Dima",
        subject: "Funds Found by an African Oil Tycoon for you!",
        description: `
        Dear Alfie,

        In an unexpected turn of events, the African oil tycoon who reached out to you previously has made a discovery that may be of interest. He claims to have come across a significant sum of money, and he believes it belongs to you. We recommend proceeding with caution and verifying the authenticity of this claim.
        
        Best regards,
        Dimitri`,
        time: 1672444800000,
        isRead: false,
        removedAt: null,
        from: 'Dimitri@protonmail.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 2,
        title: "Alfie",
        subject: "Congratulations,You've Won $19 Million USD in the Lottery!",
        description: `
        
        Dear Yarin,
        
        We are thrilled to inform you that you are the lucky winner of a staggering $19 million USD in the lottery organized by Mifal Hapias! Your persistence has truly paid off, and we couldn't be happier for you. Please get in touch with us at your earliest convenience to claim your life-changing prize.
        
        Warmest congratulations,
        
        Alfie
        Mifal Hapias Team
        `,
        time: 1684051200000,
        isRead: true,
        removedAt: null,
        from: 'alfie@gmail.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isChecked: false,
    }
    ,
    {
        id: 3,
        title: "Emily",
        subject: "Introducing Our New Solar Panel Technology",
        description: `
        Hey there,
    
        We've just launched our revolutionary solar panels capable of generating twice the power of traditional models. We're offering a limited-time discount for early adopters.
    
        Cheers,
        Emily`,
        time: 1693017600000,
        isRead: false,
        removedAt: null,
        from: 'Emily@solarenergy.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 4,
        title: "John",
        subject: "Pet Food Recall Notice",
        description: `
        Hi Alfie,
    
        Urgent notice regarding the recall of our latest pet food batch. Please refrain from feeding this to your pets and return the product immediately for a full refund.
    
        Regards,
        John`,
        time: 1659350400000,
        isRead: false,
        removedAt: null,
        from: 'John@petcare.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 5,
        title: "Sophia",
        subject: "Important Software Update Required",
        description: `
        Dear Alfie,
    
        Our systems show that you have not yet updated your software to the latest version. Failure to update may expose your system to security risks.
    
        Best,
        Sophia`,
        time: 1669862400000,
        isRead: false,
        removedAt: null,
        from: 'Sophia@techupdate.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 6,
        title: "Sebastian",
        subject: "Cancelled Flight Information",
        description: `
        Hi Alfie,
    
        We regret to inform you that your flight has been cancelled due to unforeseen weather conditions. We apologize for any inconvenience caused.
    
        Regards,
        Mark`,
        time: 1675987200000,
        isRead: false,
        removedAt: null,
        from: 'Mark@airways.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 7,
        title: "Alfie",
        subject: "Upcoming Events in Your Area",
        description: `
        Hey John,
    
        There are several exciting events happening in your area soon! Check them out before tickets run out!
    
        Warm regards,
        Alfie`,
        time: 1691308800000,
        isRead: true,
        removedAt: null,
        from: 'alfie@gmail.com',
        to: 'John@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 8,
        title: "Liam",
        subject: "Your Gym Membership is Expiring Soon",
        description: `
        Dear Alfie,
    
        Your gym membership is expiring soon. Would you like to renew or are you considering another option?
    
        Cheers,
        Daniel`,
        time: 1680028800000,
        isRead: false,
        removedAt: null,
        from: 'Daniel@gym.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 9,
        title: "Olivia",
        subject: "Your Subscription to Art Monthly",
        description: `
        Hi Alfie,
    
        Just a reminder that your subscription to Art Monthly is set to auto-renew in 7 days. To make changes, please visit your account settings.
    
        Best,
        Olivia`,
        time: 1665888000000,
        isRead: false,
        removedAt: null,
        from: 'Olivia@artmonthly.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 10,
        title: "Liam",
        subject: "How to Boost Your WiFi Signal",
        description: `
        Alfie,
    
        Struggling with a slow WiFi connection? Our guide provides some practical tips to boost your signal at home.
    
        Kind regards,
        Liam`,
        time: 1677715200000,
        isRead: false,
        removedAt: null,
        from: 'Liam@techguide.com',
        to: 'alfie@gmail.com',
        isStarred: true,
        isTrash: false,
        isDraft: false,
    }
    ,
    {
        id: 11,
        title: "Ella",
        subject: "Your Car's Scheduled Maintenance",
        description: `
        Hello Alfie,
    
        Your car is due for its scheduled maintenance next week. Please make an appointment at your earliest convenience.
    
        Emma`,
        time: 1657507200000,
        isRead: false,
        removedAt: null,
        from: 'Emma@carservice.com',
        to: 'alfie@gmail.com',
        isStarred: true,
        isTrash: false,
        isDraft: false,
    }

];


export const emailIncoming = {
    getEmailRowData,
    saveToStorage,
    saveEmail,
    deleteEmail, 
    updateEmail,
    formatDate
}
const LATEST_EMAIL_VERSION = 14; 
const EMAIL_VERSION_KEY = 'EMAIL_VERSION';

_createEmailRowData()

async function getEmailRowData() {
    try {
        const emailRowData = await storageService.query(EMAILROWDATA_KEY);
        if (emailRowData.length === 0) {
            console.log('No email data found');  
        }
        return emailRowData;
    } catch (error) {
        console.error('An error occurred while fetching email data:', error);
        return null;  
    }
}
        
function deleteEmail(emailId) {
    return storageService.query(EMAILROWDATA_KEY)
        .then(emailRowData => {
            const emailIdx = emailRowData.findIndex(email => email.id === emailId);
            if (emailIdx === -1) {
                throw new Error('Email not found');
            }
            emailRowData.splice(emailIdx, 1);
            return utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData);
        });
}

  


function _createEmailRowData() {
    let storedVersion = utilService.loadFromStorage(EMAIL_VERSION_KEY);
    if (storedVersion !== LATEST_EMAIL_VERSION) {
        utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData);
        utilService.saveToStorage(EMAIL_VERSION_KEY, LATEST_EMAIL_VERSION);
    }
}
        

        
function saveEmail(newEmail) {
    return storageService.query(EMAILROWDATA_KEY)
      .then(emailRowData => {
        emailRowData.push(newEmail);
        return utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData);
      });
  }
  
  function saveToStorage(key, data) {
    
    return utilService.saveToStorage(key, data);
}


function updateEmail(updatedEmail) {
    return storageService.query(EMAILROWDATA_KEY)
        .then(emailRowData => {
            const emailIdx = emailRowData.findIndex(email => email.id === updatedEmail.id);
            if (emailIdx === -1) {
                throw new Error('Email not found');
            }
            emailRowData[emailIdx] = updatedEmail;
            return utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData);
        });
}


