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
        title: "Dimitri",
        subject: "Funds Found by an African Oil Tycoon for you!",
        description: `
        Dear Alfie,

        In an unexpected turn of events, the African oil tycoon who reached out to you previously has made a discovery that may be of interest. He claims to have come across a significant sum of money, and he believes it belongs to you. We recommend proceeding with caution and verifying the authenticity of this claim.
        
        Best regards,
        Dimitri`,
        time: "Monday 17th Febuary 2023 18:30 PM", 
        isRead: false,
        removedAt: null,
        from: 'dimitri@protonmail.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 2,
        title: "Ariella",
        subject: "Congratulations,You've Won $19 Million USD in the Lottery!",
        description: `
        
        Dear Yarin,
        
        We are thrilled to inform you that you are the lucky winner of a staggering $19 million USD in the lottery organized by Mifal Hapias! Your persistence has truly paid off, and we couldn't be happier for you. Please get in touch with us at your earliest convenience to claim your life-changing prize.
        
        Warmest congratulations,
        
        Ariella
        Mifal Hapias Team
        `,
        time: "Tuesday 19th March 2023 23:30 PM",
        isRead: true,
        removedAt: null,
        from: 'ariella@gmail.com',
        to: 'alfie@gmail.com',
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isChecked: false,
    }
];

_createEmailRowData()

export const emailIncoming = {
    getEmailRowData,
    saveToStorage,
}

function getEmailRowData(){
    
    return storageService.query(EMAILROWDATA_KEY).then(emailRowData => emailRowData)
}


function _createEmailRowData() {
    let data = utilService.loadFromStorage(EMAILROWDATA_KEY)
    if (!data || !data.length) {
        data = emailRowData
        utilService.saveToStorage(EMAILROWDATA_KEY, data)
    }
}
        



  function saveToStorage(key, data) {
    
    return utilService.saveToStorage(key, data);
}