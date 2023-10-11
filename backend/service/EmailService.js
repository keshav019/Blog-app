const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAILPORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});


exports.sendMail = async (otp, email, firstName) => {
    console.log(process.env.HOST);
    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            text: `Hello ${firstName}\n Otp to verify your Email is : ${otp}.\n It will expired in next 10 minutes.`,
        });
    } catch (err) {
        console.log(err);
    }
}

