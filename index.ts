import { Twilio } from "twilio";
import { config } from 'dotenv';
import sgMail  from '@sendgrid/mail';
import express from "express";

config({path: '.env'})
const port = 3500;

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_MESSENGING_SERVICE_SID,
  TWILIO_PHONE_NUMBER,
  SENDGRID_API_KEY,
} = process.env

const app: express.Application = express();
app.use(express.json());

console.log(TWILIO_ACCOUNT_SID)
console.log(TWILIO_AUTH_TOKEN)

const twilio: Twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
sgMail.setApiKey(SENDGRID_API_KEY || "");

app.post('/sms', async (req, res) => {
  console.log(req.body)
  const msg: {subject: string, message: string, to: string} = req.body; 

  await twilio.messages.create({
    body: msg.message,
    messagingServiceSid: TWILIO_MESSENGING_SERVICE_SID,
    from: TWILIO_PHONE_NUMBER,
    to: msg.to
  })
  .then(message => console.log(message));

  res.send(`SMS "${msg.subject}" sent to ${msg.to}: ${msg.message}`);
});

app.post('/email', async (req, res) => {
  const msg: {subject: string, text: string, html: string, to: string, from: string} = req.body; 

  await sgMail.send(msg);

  res.send(`Email "${msg.subject}" sent to ${msg.to}: ${msg.text}`);
});

app.listen(port, () => {
  console.log(`Twilio POC up and ready`);
});
