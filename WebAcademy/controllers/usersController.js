const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../database/models');

// Helpers
const mailing = require('./helpers/mailerHelper');
const userHelper = require('./helpers/userHelper');

let categories = db.Category.findAll({ include: { association: 'courses' } });

let usersController = {
    register: (req, res) => {
        categories.then(categories => res.render('register', { categories, loggedInUser: req.session.loggedIn }));
    },
    create: (req, res) => {
        registerUser = db.User.findOne({ where: { email: req.body.email } });

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('register', { errors: errors.errors, categories, loggedInUser: req.session.loggedIn });
        } else {
            Promise.all([categories, registerUser])
                .then(([categories, registerUser]) => {
                    if (registerUser != null) {
                        res.render('register', {
                            errors: [
                                { msg: 'Esa dirección de correo electrónico ya está siendo utilizada por otro usuario.' }
                            ], loggedInUser: { name: 'Iniciar Sesión' }, categories
                        });
                    } else {
                        let user;
                        if (req.files[0] != undefined) { // si hay avatar
                            user = userHelper.create_fullUser(req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10), `/img/users/${req.files[0].filename}`);
                        } else {
                            user = userHelper.create_fullUser(req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10), `/img/users/no_avatar.png`);
                        };

                        db.User.create(user)
                            .then(() => {
                                mailing.sendWelcomeEmail(user.email, user.name);
                                db.User.findOne({ where: { email: user.email } })
                                    .then(newUser => {
                                        req.session.loggedIn = newUser;
                                        res.cookie('remember', newUser.id, { maxAge: 6000000 });

                                        let admin = userHelper.admin_validator(req.session.loggedIn, categories, res);

                                    });
                            });
                    };
                });
        };
    },
    login: (req, res) => {
        categories.then(categories => {
            res.render('login', { categories, loggedInUser: req.session.loggedIn });
        });
    },
    processLogin: (req, res) => {

        loginUser = db.User.findOne({ where: { email: req.body.email } });

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('login', { errors: errors.errors, loggedInUser: { name: 'Iniciar Sesión' }, categories });
        } else {
            Promise.all([categories, loginUser])
                .then(([categories, loginUser]) => {
                    if ((loginUser != null && bcrypt.compareSync(req.body.password, loginUser.password)) || (loginUser != null && req.body.password === loginUser.password)) {
                        // en la database tenemos contraseñas no encriptadas, por eso tengo que verificar tambien sin el bcrypt, en un futuro seria solo con bcrypt.

                        req.session.loggedIn = loginUser;
                        loggedInUser = req.session.loggedIn;

                        if (req.body.remember != undefined) {
                            res.cookie('remember', loginUser.id, { maxAge: 6000000 });
                        };

                        let admin = userHelper.admin_validator(req.session.loggedIn, categories, res);

                    } else {
                        req.session.destroy();
                        res.clearCookie('remember');
                        res.render('login', {
                            errors: [
                                { msg: 'Credenciales inválidas' }
                            ], loggedInUser: { name: 'Iniciar Sesión' }, categories
                        });
                    };
                });
        };
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/users/login');
    },
    users: (req, res) => {
        categories
        .then((categories) => {
            let admin = userHelper.admin_validator(req.session.loggedIn, categories, res);
        });
    },
    edit: (req, res) => {
        user = db.User.findOne({ where: { id: req.session.loggedIn.id } });

        Promise.all([categories, user])
            .then(([categories, user]) => {
                res.render('editProfile', { user: user, loggedInUser: req.session.loggedIn, categories });
            });
    },
    update: (req, res) => {
        db.User.findOne({ where: { id: req.session.loggedIn.id } })
            .then(user => { return user })
            .then((previousUser) => {
                let errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.render('editProfile', { user: previousUser, errors: errors.errors, loggedInUser: req.session.loggedIn, categories });
                } else {
                    if (req.body.email != previousUser.email) {
                        res.render('editProfile', {
                            user: previousUser, errors: [
                                { msg: 'Actualmente no puedes cambiar tu dirección de correo electrónico.' }
                            ], loggedInUser: req.session.loggedIn, categories
                        });
                    } else {
                        let user;
                        if (req.body.password == '' && req.body.c_password == '') {
                            if (req.files[0] != undefined) {
                                user = userHelper.update_fullUser(req.session.loggedIn.id, req.body.name, req.body.email, previousUser.password, `/img/users/${req.files[0].filename}`);
                            } else {
                                if (previousUser.avatar != undefined) {
                                    user = userHelper.update_fullUser(req.session.loggedIn.id, req.body.name, req.body.email, previousUser.password, previousUser.avatar);
                                } else {
                                    user = userHelper.update_noAvatarUser(req.session.loggedIn.id, req.body.name, req.body.email, previousUser.password);
                                };
                            };
                        } else {
                            if (req.body.password != req.body.c_password) {
                                res.render('editProfile', {
                                    user: previousUser, errors: [
                                        { msg: 'Las contraseñas deben coincidir.' }
                                    ], loggedInUser: req.session.loggedIn, categories
                                });
                            } else {
                                if (req.files[0] != undefined) {
                                    user = userHelper.update_fullUser(req.session.loggedIn.id, req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10), `/img/users/${req.files[0].filename}`);
                                } else {
                                    if (previousUser.avatar != undefined) {
                                        user = userHelper.update_fullUser(req.session.loggedIn.id, req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10), previousUser.avatar);
                                    } else {
                                        user = userHelper.update_noAvatarUser(req.session.loggedIn.id, req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10));
                                    };
                                };
                            };
                        };
                        let update = db.User.update(user, { where: { id: req.session.loggedIn.id } });

                        Promise.all([update, user])
                            .then(([update, user]) => {
                                update;
                                res.clearCookie('remember');
                                req.session.loggedIn = user;
                                if (req.body.remember != undefined) {
                                    res.cookie('remember', req.session.loggedIn.id, { maxAge: 6000000 });
                                };
                                res.redirect('/users');
                            });
                    };
                };
            });
    },
    destroy: (req, res) => {
        db.User.destroy({ where: { id: req.session.loggedIn.id } })
            .then(user => {
                req.session.destroy();
                res.clearCookie('remember');
                res.redirect('/users/login');
            });
        // FALTARIA CASCADE O ELIMINAR TODA TABLA RELACIONADA A ESE USER
    },
};

module.exports = usersController;