const mailer = require('../../mailer/mailer');

module.exports = {
    sendWelcomeEmail: (email_destination) => {
        const mailOptions = {
            from: 'no-reply@webacademy.com',
            to: email_destination,
            subject: '¡Bienvenido/a a Web Academy!',
            text: 'Te damos la bienvenida a Web Academy!'
        };

        mailer.sendMail(mailOptions, function(err) {
            if(err) { return console.log(err.message); };

            console.log(`Se ha enviado un email de verificación a: ${email_destination}.`);
        });
    },
};