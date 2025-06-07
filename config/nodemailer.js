const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');
require('dotenv').config();

class Email {
    constructor(user, event) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0]; // Assuming name is "FirstName LastName"
        this.event = event;
        this.from = process.env.EMAIL_USER;
    }

    newTransport() {
        // For production, use a professional email service (SendGrid, Mailgun, etc.)
        // For development/testing, use Mailtrap.io or your actual email provider (Gmail, Outlook)
        // Be cautious with actual email providers in dev; they might have rate limits or security concerns.

        // Example for Gmail:
        // return nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 587,
        //     secure: false, // Use TLS (STARTTLS)
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });

        // General configuration from .env
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports like 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async send(template, subject) {
        // 1. Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            userName: this.firstName,
            eventTitle: this.event.title,
            eventDate: this.event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            eventLocation: this.event.location,
            currentYear: new Date().getFullYear(),
            subject
        });

        // 2. Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html, {
                wordwrap: 130
            })
        };

        // 3. Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendEventConfirmation() {
        await this.send('eventConfirmation', 'Event Creation Confirmation');
    }
}

module.exports = Email;