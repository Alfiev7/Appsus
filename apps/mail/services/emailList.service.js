import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const SECTIONDATA_KEY = 'SECTIONDATA_DB'
export const EMAILROWDATA_KEY = 'EMAILROW_DB'

const sectionData = [
  {
    Icon: 'fa-solid fa-inbox',
    title: 'Primary',
    color: 'red',
    isActive: true,
  },
  {
    Icon: 'fa-solid fa-tag',
    title: 'Promotion',
    color: 'blue',
    isActive: false,
  },
  {
    Icon: 'fa-solid fa-user-group',
    title: 'Social',
    color: 'green',
    isActive: false,
  },
]

export const sectionService = {
  getSectionData,
}

_createSectionData()

function getSectionData() {
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
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  const dateString = new Intl.DateTimeFormat('en-US', options).format(date)
  return dateString
}
const now = new Date()

const emailRowData = [
  {
    id: 1,
    title: 'Dima',
    subject: 'Funds Found by an African Oil Tycoon for you!',
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
    labels: [],
  },
  {
    id: 2,
    title: 'Alfie',
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
    labels: [],
  },
  {
    id: 3,
    title: 'Emily',
    subject: 'Introducing Our New Solar Panel Technology',
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
    labels: [],
  },
  {
    id: 4,
    title: 'John',
    subject: 'Pet Food Recall Notice',
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
    labels: [],
  },
  {
    id: 5,
    title: 'Sophia',
    subject: 'Important Software Update Required',
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
    labels: [],
  },
  {
    id: 6,
    title: 'Sebastian',
    subject: 'Cancelled Flight Information',
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
    labels: [],
  },
  {
    id: 7,
    title: 'Alfie',
    subject: 'Upcoming Events in Your Area',
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
    labels: [],
  },
  {
    id: 8,
    title: 'Liam',
    subject: 'Your Gym Membership is Expiring Soon',
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
    labels: [],
  },
  {
    id: 9,
    title: 'Olivia',
    subject: 'Your Subscription to Art Monthly',
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
    labels: [],
  },
  {
    id: 10,
    title: 'Liam',
    subject: 'How to Boost Your WiFi Signal',
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
    labels: [],
  },
  {
    id: 11,
    title: 'Ella',
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
    labels: [],
  },
  {
    id: 12,
    title: 'Olivia',
    subject: 'Urgent: Account Security Alert',
    description: `
        Hi Alfie,
    
        We have detected unusual activity on your account. To ensure your account's security, please reset your password immediately by clicking the following link:
    
        [Reset Password](https://example.com/reset-password)
    
        If you did not initiate this action, please contact our support team.
    
        Regards,
        Olivia`,
    time: 1677120000000,
    isRead: false,
    removedAt: null,
    from: 'security@example.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 13,
    title: 'Sophia',
    subject: 'Important Meeting Invitation',
    description: `
        Hi Alfie,
    
        You are cordially invited to an important meeting scheduled for next week. The details are as follows:
    
        Date: September 15th, 2023
        Time: 10:00 AM
        Location: Conference Room A
    
        Please confirm your attendance at your earliest convenience.
    
        Best regards,
        Sophia`,
    time: 1677180000000,
    isRead: false,
    removedAt: null,
    from: 'sophia@company.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 14,
    title: 'Liam',
    subject: 'Payment Confirmation',
    description: `
        Hi Alfie,
    
        We are writing to confirm the successful payment of your recent order. The transaction details are as follows:
    
        Order Number: 123456789
        Payment Amount: $50.00
        Payment Date: September 10th, 2023
    
        Thank you for your purchase.
    
        Sincerely,
        Liam`,
    time: 1677250000000,
    isRead: false,
    removedAt: null,
    from: 'billing@shop.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 15,
    title: 'Ava',
    subject: 'New Job Opportunity',
    description: `
        Hi Alfie,
    
        We are excited to offer you a new job opportunity at our company. The position details are attached in the PDF document. Please review it and let us know your decision.
    
        We look forward to your response.
    
        Regards,
        Ava`,
    time: 1677320000000,
    isRead: false,
    removedAt: null,
    from: 'hr@company.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 16,
    title: 'Noah',
    subject: 'Package Delivery Notification',
    description: `
        Hi Alfie,
    
        Your package with tracking number 987654321 is out for delivery today. Please ensure someone is available to receive it.
    
        Thank you for choosing our delivery service.
    
        Sincerely,
        Noah`,
    time: 1677390000000,
    isRead: false,
    removedAt: null,
    from: 'delivery@courier.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 17,
    title: 'Isabella',
    subject: 'Vacation Package Booking',
    description: `
        Hi Alfie,
    
        Your vacation package to a tropical paradise has been successfully booked. We are excited to have you as our guest. Please find the booking details attached.
    
        Let us know if you have any questions.
    
        Best wishes,
        Isabella`,
    time: 1677460000000,
    isRead: false,
    removedAt: null,
    from: 'travel@agency.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 18,
    title: 'Mason',
    subject: 'Product Feedback Request',
    description: `
        Hi Alfie,
    
        We value your feedback! Please take a moment to share your thoughts on our latest product. Your input is important to us and will help us improve our services.
    
        Click here to provide feedback: [Feedback Survey](https://example.com/feedback)
    
        Thank you in advance.
    
        Regards,
        Mason`,
    time: 1677530000000,
    isRead: false,
    removedAt: null,
    from: 'feedback@company.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 19,
    title: 'Evelyn',
    subject: 'Account Upgrade Confirmation',
    description: `
        Hi Alfie,
    
        Your account has been successfully upgraded to Premium status. Enjoy enhanced features and benefits. For more information, please visit our website.
    
        If you have any questions, feel free to contact our support team.
    
        Best regards,
        Evelyn`,
    time: 1677600000000,
    isRead: false,
    removedAt: null,
    from: 'support@premiumservice.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 20,
    title: 'Oliver',
    subject: 'Invitation to Art Exhibition',
    description: `
        Hi Alfie,
    
        You are invited to our upcoming art exhibition featuring renowned artists from around the world. Join us for an evening of art and culture.
    
        Date: September 20th, 2023
        Time: 7:00 PM
        Venue: Art Gallery
    
        RSVP by September 15th.
    
        Regards,
        Oliver`,
    time: 1677670000000,
    isRead: false,
    removedAt: null,
    from: 'events@artgallery.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 21,
    title: 'Charlotte',
    subject: 'Job Application Status',
    description: `
        Hi Alfie,
    
        We have reviewed your job application and would like to schedule an interview with you. Please reply to this email with your availability for the coming week.
    
        We look forward to meeting you.
    
        Sincerely,
        Charlotte`,
    time: 1677740000000,
    isRead: false,
    removedAt: null,
    from: 'hr@company2.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 22,
    title: 'Liam',
    subject: 'Payment Confirmation',
    description: `
        Hi Alfie,
    
        We are writing to confirm the successful payment of your recent order. The transaction details are as follows:
    
        Order Number: 987654321
        Payment Amount: $75.00
        Payment Date: September 12th, 2023
    
        Thank you for your purchase.
    
        Sincerely,
        Liam`,
    time: 1677810000000,
    isRead: false,
    removedAt: null,
    from: 'billing@shop2.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 23,
    title: 'Amelia',
    subject: 'Congratulations on Your Promotion',
    description: `
        Hi Alfie,
    
        We are delighted to inform you that you have been promoted to the position of Senior Developer. Your hard work and dedication have paid off.
    
        Your new responsibilities and benefits will be discussed in an upcoming meeting. Congratulations!
    
        Regards,
        Amelia`,
    time: 1677880000000,
    isRead: false,
    removedAt: null,
    from: 'hr@company3.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 24,
    title: 'Mia',
    subject: 'Exclusive Offers for You',
    description: `
        Hi Alfie,
    
        You are eligible for exclusive offers and discounts as a valued customer. Don't miss out on these fantastic deals.
    
        Visit our website to explore the offers: [Exclusive Offers](https://example.com/offers)
    
        Best regards,
        Mia`,
    time: 1677950000000,
    isRead: false,
    removedAt: null,
    from: 'offers@discounts.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 25,
    title: 'Lucas',
    subject: 'Important Update: Account Security',
    description: `
        Hi Alfie,
    
        We have implemented enhanced security measures for your account. Please log in to your account and review these changes.
    
        If you encounter any issues, contact our support team immediately.
    
        Sincerely,
        Lucas`,
    time: 1678020000000,
    isRead: false,
    removedAt: null,
    from: 'security@myaccount.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 26,
    title: 'Harper',
    subject: 'Your Requested Information',
    description: `
        Hi Alfie,
    
        Thank you for your inquiry. Attached, you will find the requested information document.
    
        If you have any further questions, please don't hesitate to reach out.
    
        Regards,
        Harper`,
    time: 1678090000000,
    isRead: false,
    removedAt: null,
    from: 'info@company4.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 27,
    title: 'Evelyn',
    subject: 'Important Notice: Account Verification',
    description: `
        Hi Alfie,
    
        Our records indicate that your account information needs verification. Please follow the link below to complete the process:
    
        [Verify Account](https://example.com/verify)
    
        Your prompt action is required.
    
        Best regards,
        Evelyn`,
    time: 1678160000000,
    isRead: false,
    removedAt: null,
    from: 'verification@myaccount.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 28,
    title: 'William',
    subject: 'Congratulations on Your Graduation',
    description: `
        Hi Alfie,
    
        We are thrilled to congratulate you on your graduation. Your hard work and dedication have paid off, and we wish you success in your future endeavors.
    
        Celebrate your achievements!
    
        Regards,
        William`,
    time: 1678230000000,
    isRead: false,
    removedAt: null,
    from: 'congratulations@celebrate.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
  {
    id: 29,
    title: 'James',
    subject: 'Exclusive Offer: 20% Off Your Next Purchase',
    description: `
        Hi Alfie,
    
        As a token of our appreciation, here's an exclusive offer for you: Get 20% off your next purchase with us.
    
        Use code: SAVE20 at checkout.
    
        Happy shopping!
    
        Sincerely,
        James`,
    time: 1678300000000,
    isRead: false,
    removedAt: null,
    from: 'offers@shop5.com',
    to: 'alfie@gmail.com',
    isStarred: false,
    isTrash: false,
    isDraft: false,
    labels: [],
  },
]

export const emailIncoming = {
  getEmailRowData,
  saveToStorage,
  saveEmail,
  deleteEmail,
  updateEmail,
  formatDate,
}
const LATEST_EMAIL_VERSION = 17
const EMAIL_VERSION_KEY = 'EMAIL_VERSION'

_createEmailRowData()

async function getEmailRowData() {
  try {
    const emailRowData = await storageService.query(EMAILROWDATA_KEY)
    if (emailRowData.length === 0) {
      console.log('No email data found')
    }
    return emailRowData
  } catch (error) {
    console.error('An error occurred while fetching email data:', error)
    return null
  }
}

function deleteEmail(emailId) {
  return storageService.query(EMAILROWDATA_KEY).then(emailRowData => {
    const emailIdx = emailRowData.findIndex(email => email.id === emailId)
    if (emailIdx === -1) {
      throw new Error('Email not found')
    }
    emailRowData.splice(emailIdx, 1)
    return utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData)
  })
}

function _createEmailRowData() {
  let storedVersion = utilService.loadFromStorage(EMAIL_VERSION_KEY)
  if (storedVersion !== LATEST_EMAIL_VERSION) {
    utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData)
    utilService.saveToStorage(EMAIL_VERSION_KEY, LATEST_EMAIL_VERSION)
  }
}

function saveEmail(newEmail) {
  return storageService.query(EMAILROWDATA_KEY).then(emailRowData => {
    emailRowData.push(newEmail)
    return utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData)
  })
}

function saveToStorage(key, data) {
  return utilService.saveToStorage(key, data)
}

function updateEmail(updatedEmail) {
  return storageService
    .query(EMAILROWDATA_KEY)
    .then(emailRowData => {
      const emailIdx = emailRowData.findIndex(email => email.id === updatedEmail.id)
      if (emailIdx === -1) {
        throw new Error('Email not found')
      }
      emailRowData[emailIdx] = updatedEmail
      return utilService.saveToStorage(EMAILROWDATA_KEY, emailRowData)
    })
    .catch(err => console.error('updateEmail error:', err))
}
