const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'herman31@ethereal.email',
        pass: '1X48PwjrdKhh2aaErU'
    }
});

module.exports = transporter;

// Name: Herman Klein
// Username: herman31@ethereal.email
// Password: 1X48PwjrdKhh2aaErU