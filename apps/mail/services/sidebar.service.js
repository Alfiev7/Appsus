import { storageService } from "../../../services/async-storage.service.js";
import {utilService} from "../../../services/util.service.js";

const SIDEBAR_KEY = 'SIDEBAR_DB'


const sideBarData =[
    {
        icon: "fa-solid fa-inbox",
        title: "Inbox",
        number: 0
    },
    {
        icon: "fa-solid fa-star",
        title: "Starred",
        number: 0
    },
    {
        icon: "fa-solid fa-share-from-square",
        title: "Sent",
        number: 0
    },
    {
        icon: "fa-brands fa-firstdraft",
        title: "Drafts",
        number: 0
    },
    {
        icon: "fa-regular fa-trash-can",
        title: "Trash",
        number: 0
    }
];

_createSideBarData()



export const sideBarService = {
    getSideBarData,
}

function getSideBarData(){
    return storageService.query(SIDEBAR_KEY).then(sideBarData => sideBarData)
}


function _createSideBarData() {
    let data = utilService.loadFromStorage(SIDEBAR_KEY)
    if (!data || !data.length) {
      data = sideBarData
      utilService.saveToStorage(SIDEBAR_KEY, data)
    }
  }