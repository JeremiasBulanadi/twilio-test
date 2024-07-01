// import { config } from 'dotenv';
// import { Twilio } from 'twilio';
import { Vonage } from '@vonage/server-sdk';

// config({path: '.env'})

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new Twilio(accountSid, authToken);

// const message = client.messages
//   .create({
//     body: 'You have an appointment with Owl, Inc. on Friday, November 3 at 4:00 PM. Reply C to confirm.',
//     messagingServiceSid: 'MG2a2f515f8118114f1ab7a2b832bfdb3a',
//     to: '+16508177932'
//   })
//   .then(message => console.log(message));

// const vonage = new Vonage({
//   apiKey: "665479f9",
//   apiSecret: "pd8ujOn5EWMwT8B8"
// })

// const from = "Vonage APIs"
// const to = "639420533320"
// const text = 'A text message sent using the Vonage SMS API'

// async function sendSMS() {
//   await vonage.sms.send({to, from, text})
//       .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//       .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// }

// sendSMS();