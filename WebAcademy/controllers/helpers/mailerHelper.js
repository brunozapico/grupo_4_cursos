const mailer = require('../../mailer/mailer');

module.exports = {
    sendWelcomeEmail: (email_destination, user_name) => {
        const mailOptions = {
            from: 'no-reply@webacademy.com',
            to: email_destination,
            subject: '¡Bienvenido/a a Web Academy!',
            text: 
            `<h1 style="text-align: center">¡${user_name}, te damos la bienvenida a Web Academy!</h1>
            <h3 style="text-align: center">La comunidad de educación en línea perfecta para vos.</h3>
            <h5>¡Ahora, a estudiar!</h5>
            
            <hr>`
        };

        mailer.sendMail(mailOptions, function(err) {
            if(err) { return console.log(err.message); };

            console.log(`Se ha enviado un email de verificación a: ${email_destination}.`);
        });
    },
};