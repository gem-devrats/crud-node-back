
import nodeMailer from 'nodemailer'

export const sendMails = async (to: string, subject: string, message: string) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'devvrat.sharma@geminisolutions.com',
            pass: 'xxxxxxx' //password not here for security reasons
        }
    });
    let mailOptions = {
        from: 'devvrat.sharma@geminisolutions.com',
        to: to,
        subject: subject,
        text: message,
        html: ''
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
