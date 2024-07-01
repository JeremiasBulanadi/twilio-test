"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const dotenv_1 = require("dotenv");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const express_1 = __importDefault(require("express"));
(0, dotenv_1.config)({ path: '.env' });
const port = 3500;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MESSENGING_SERVICE_SID, TWILIO_PHONE_NUMBER, SENDGRID_API_KEY, } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log(TWILIO_ACCOUNT_SID);
console.log(TWILIO_AUTH_TOKEN);
const twilio = new twilio_1.Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
mail_1.default.setApiKey(SENDGRID_API_KEY || "");
app.post('/sms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const msg = req.body;
    yield twilio.messages.create({
        body: msg.message,
        messagingServiceSid: TWILIO_MESSENGING_SERVICE_SID,
        from: TWILIO_PHONE_NUMBER,
        to: msg.to
    })
        .then(message => console.log(message));
    res.send(`SMS "${msg.subject}" sent to ${msg.to}: ${msg.message}`);
}));
app.post('/email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = req.body;
    yield mail_1.default.send(msg);
    res.send(`Email "${msg.subject}" sent to ${msg.to}: ${msg.text}`);
}));
app.listen(port, () => {
    console.log(`Twilio POC up and ready`);
});
