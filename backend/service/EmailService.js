const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});


exports.sendMail = async (otp, email, firstName) => {
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        text: `Hello ${firstName}\n Otp to verify your Email is : ${otp}.\n It will expired in next 10 minutes.`,
    });
}

