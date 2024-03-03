import * as dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();

const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

export default transporter;
