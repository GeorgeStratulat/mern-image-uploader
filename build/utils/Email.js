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
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = __importDefault(require("html-to-text"));
class Email {
    constructor(user) {
        this.to = user.email;
        this.from = `Jonathan Punzalan <${process.env.EMAIL_FROM}>`;
    }
    newTransport() {
        if (process.env.NODE_ENV === "production") {
            // Sendgrid
            return nodemailer_1.default.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }
        // nodemailer doesnt have the correct options types
        // Use mailtrap
        else
            return nodemailer_1.default.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
    }
    send(template, subject, props) {
        return __awaiter(this, void 0, void 0, function* () {
            //Template is an html template to be sent
            // Send the actual email
            // 1) Render HTML using pug
            // Insert props such as firstName, url and subject
            const html = pug_1.default.renderFile(`${__dirname}/../templates/${template}.pug`, Object.assign({ subject }, props));
            // 3) Define mail options
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html,
                text: html_to_text_1.default.fromString(html)
            };
            // 3) create a transport and send email
            yield this.newTransport().sendMail(mailOptions);
        });
    }
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send("welcome", "Welcome new member!");
        });
    }
    sendPasswordReset(resetToken, url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send("passwordReset", "Forgotten password reset link (valid for only 10 minutes)", { resetToken, url });
        });
    }
}
exports.Email = Email;
