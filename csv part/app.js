const nodemailer = require('nodemailer');
const MailMessage = require('nodemailer/lib/mailer/mail-message');

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "doejohn66779@gmail.com",
        pass: "Vignesh@125"
    }
});

const mails = ['paramashivakaranth@gmail.com', 'udithbkl100@gmail.com', 'bekalpranay@gmail.com', 'vigneshkundar125@gmail.com', 'vigneshkundar@outlook.com'];


var mailOptions = {
    from: 'john doe',
    to: mails,
    subject: 'Impo Notice 🫡',
    text: `hey this is an test mail.`,
    html: `
    <h2>Just wanted to say that you are not homosapiens!!</h2>
    <img src="https://media.giphy.com/media/g7GKcSzwQfugw/giphy.gif"></img>
    <p>😶‍🌫️</p>
    `
};

transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err);
    } else {
        console.log("\n------->");
        console.log("Mail sent🫡 \n" + info.response);
        console.log("------->\n");
    }
});