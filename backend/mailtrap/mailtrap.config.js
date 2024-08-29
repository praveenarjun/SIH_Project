import nodemailer from 'nodemailer';

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other service like 'yahoo', 'outlook', etc.
    auth: {
        user: 'raftaramrit@gmail.com', // your email address
        pass: 'wehe yhgu hkgd herm'    // your email password
    }
});

// Define email options
const mailOptions = {
    from: 'raftaramrit@gmail.com',  // sender address
    to: 'vvivu09123@gmail.com',   // list of receivers
    subject: 'Hello ✔',            // Subject line
    text: 'Hello world?',           // plain text body
    html: '<b>Hello world?</b>'     // HTML body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
