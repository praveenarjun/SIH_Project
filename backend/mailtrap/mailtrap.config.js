import nodemailer from 'nodemailer';

// Create a transporter object using your email service
export const MailtrapClient = nodemailer.createTransport({
    service: 'gmail', // or any other service like 'yahoo', 'outlook', etc.
    auth: {
        user: 'raftaramrit@gmail.com', // your email address
        pass: 'wehe yhgu hkgd herm'    // your email password
    }
});

// Define email options
export const sender = {
    from: 'raftaramrit@gmail.com',  // sender address
    to: 'hrithikroshan7485@gmail.com',   // list of receivers
    subject: 'Hello ✔',            // Subject line
    text: 'Hello world?',           // plain text body
    html: '<b>Hello worlced?</b>'     // HTML body
};

// Send email
MailtrapClient.sendMail(sender, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
