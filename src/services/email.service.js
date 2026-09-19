const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((err, success) => {
    if(err){
        console.log("Error connecting to email server: ", err);
    }else{
        console.log("Email server is ready to send message");
    }
});

const sendEmail = async (to, subject, text, html) => {
    try{
        const info = await transporter.sendMail({
            from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
            to,
            subject,
            text,
            html,
        });
    }catch(error){
        console.log("Error sending email", error);
    }
}

async function sendRegistrationEmail(userEmail, name){
    const subject = "Welcome to Backend Ledger!";
    const text = `Hello ${name}, \n\nTank you for registering at Backend Ledger.
    We're excited to have you on board!\n\n Best regards, \nThe Backend Ledger Team`;
    const html = `<p>Hello ${name}, </p><p>Tank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount){
    const subject = "Transaction Successful!";
    const text = `Hello ${name}, \n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards, \nThe Backend Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards, <br>The Backend Ledger Team`;

    await sendEmail(userEmail, subject, text, html);

}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount){
    const subject = "Transaction Failed!";
    const text = `Hello ${name}, \n\nYour transaction of $${amount} to account ${toAccount} has failed. Please try again.\n\nBest regards, \nThe Backend Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} has failed. Please try again.</p><p>Best regards, <br>The Backend Ledger Team`;

    await sendEmail(userEmail, subject, text, html);

}


module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail,
};

