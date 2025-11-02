import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === 'production', // true for 465, false for other ports
        auth: {
            user: "tasnimrahman0202@gmail.com",
            pass: "cgdi ovin ufyo dgbe",
        },
    });

    await transporter.sendMail({
        from: 'tasnimrahman0202@gmail.com',
        to: to,
        subject: "Action Required: Please Change Your Password",
        text: `Please reset your password in 10m`,
        html: html,
    });
};