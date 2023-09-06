import { storageService } from "../../../services/async-storage.service.js";
import {utilService} from "../../../services/util.service.js";

const SECTIONDATA_KEY = 'SECTIONDATA_DB'
const EMAILROWDATA_KEY = 'EMAILROW_DB'


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
        title: "Daniel",
        subject: "Alfie you are fired",
        description: "Due to unforseen events, you will be fired at 10:30am, please be sure to check out the office at 10:30am on tuesday",
        time: "10:30am", 
        isRead: false,
        removedAt: null,
        from: 'daniel@gmail.com',
        to: 'alfie@gmail.com'
    },
    {
        id: 2,
        title: "Ariella",
        subject: "Yarin, congradulations on winning the lottery!",
        description: "You are the lucky winner of 19 million USD!",
        time: "10:30am",
        isRead: false,
        removedAt: null,
        from: 'ariella@gmail.com',
        to: 'alfie@gmail.com'
    }
];

export const emailIncoming = {
    getEmailRowData,
}

function getEmailRowData(){
    return Promise.resolve(emailRowData)
}