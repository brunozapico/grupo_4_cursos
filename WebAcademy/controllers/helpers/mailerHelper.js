const mailer = require('../../mailer/mailer');

module.exports = {
    sendWelcomeEmail: (email_destination, user_name) => {
        let mailOptions = {
            from: 'no-reply@webacademy.com',
            to: email_destination,
            subject: '¡Bienvenido/a a Web Academy!',
            html: 
            `<h1 style="text-align: center">¡${user_name}, te damos la bienvenida a Web Academy!</h1>
            <h3 style="text-align: center">La comunidad de educación en línea perfecta para vos.</h3>
            <h4 style="text-align: center">¡Ahora, a estudiar!</h4>
            
            <hr>`
        };

        mailer.sendMail(mailOptions, function(err) {
            if(err) { return console.log(err.message); };

            console.log(`Se ha enviado un email de verificación a: ${email_destination}.`);
        });
    },
    sendPurchaseEmail: (email_destination) => {
        let mailOptions = {
            from: 'no-reply@webacademy.com',
            to: email_destination,
            subject: '¡Gracias por tu compra! - Web Academy',
            html: 
            `<h1 style="text-align: center">¡Te agredecemos por tu compra!</h1>
            <h3 style="text-align: center">Somos Web Academy, la comunidad de educación en línea perfecta para vos.</h3>
            <h4 style="text-align: center">¡Ahora, a estudiar!</h4>
            
            <hr>`
        };

        mailer.sendMail(mailOptions, function(err) {
            if(err) { return console.log(err.message); };

            console.log(`Se ha enviado un email verificando una nueva compra a: ${email_destination}.`);
        });
    },
};