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
        time: "Monday 17th Febuary 2023 18:30 PM", 
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
        time: "Tuesday 19th March 2023 23:30 PM",
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
        time: "Wednesday 21st September 2023 10:15 AM",
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
        time: "Saturday 3rd June 2023 4:05 PM",
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
        time: "Friday 25th August 2023 2:30 PM",
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
        title: "Mark",
        subject: "Cancelled Flight Information",
        description: `
        Hi Alfie,
    
        We regret to inform you that your flight has been cancelled due to unforeseen weather conditions. We apologize for any inconvenience caused.
    
        Regards,
        Mark`,
        time: "Sunday 9th July 2023 11:05 AM",
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
        time: "Tuesday 1st November 2023 6:50 PM",
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
        title: "Daniel",
        subject: "Your Gym Membership is Expiring Soon",
        description: `
        Dear Alfie,
    
        Your gym membership is expiring soon. Would you like to renew or are you considering another option?
    
        Cheers,
        Daniel`,
        time: "Monday 12th December 2023 10:30 AM",
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
        time: "Friday 20th October 2023 3:00 PM",
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
        time: "Thursday 18th May 2023 4:45 PM",
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
        title: "Eleanor",
        subject: "Your Car's Scheduled Maintenance",
        description: `
        Hello Alfie,
    
        Your car is due for its scheduled maintenance next week. Please make an appointment at your earliest convenience.
    
        Emma`,
        time: "Saturday 29th April 2023 1:25 PM",
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
    saveEmail
}

function getEmailRowData(){
    
    return storageService.query(EMAILROWDATA_KEY).then(emailRowData => emailRowData)
}

const LATEST_EMAIL_VERSION = 5; 
const EMAIL_VERSION_KEY = 'EMAIL_VERSION';

_createEmailRowData()

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