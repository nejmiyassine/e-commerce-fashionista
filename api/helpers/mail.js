const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { MAILTRAP_USERNAME, MAILTRAP_PASSWORD } = require('../config/env');

exports.generateOtp = () => {
    let otp = '';
    for (let i = 0; i <= 3; i++) {
        const randomValue = Math.round(Math.random() * 9);
        otp = otp + randomValue;
    }
    return otp;
};

exports.mailTransport = () =>
    nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: MAILTRAP_USERNAME,
            pass: MAILTRAP_PASSWORD,
        },
    });

exports.generateEmailTemplate = (code) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style>
                    @media only screen and (max-width: 620px) {
                        h1 {
                            font-size: 20px;
                            padding: 5px;
                        }
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>${code}</h1>
                </div>
            </body>
        </html>
    `;
};

exports.createRandomBytes = () =>
    new Promise((resolve, reject) => {
        const random = 30;
        crypto.randomBytes(random, (err, buff) => {
            if (err) reject(err);

            const token = buff.toString('hex');
            resolve(token);
        });
    });
