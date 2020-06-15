const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

const usersController = {
    register: (req, res) => {
        res.render('register', {loggedInUser: req.session.loggedIn});
    },
    create: (req, res) => {
        let user;
        if(req.files[0] != undefined){
            user = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: `/img/users/${req.files[0].filename}`,
            }
        } else {
            user = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
            }
        }
        
        db.User.create(user);

        req.session.loggedIn = user;
        res.cookie('remember', user.email, { maxAge: 6000000 })

        res.redirect('/users');
    },
    login: (req, res) => {
        res.render('login', {loggedInUser: req.session.loggedIn})
    },
    processLogin: (req, res) => {
        
        db.User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(loginUser => {
                if (loginUser != null &&  bcrypt.compareSync(req.body.password, loginUser.password)) {
                    return loginUser
                } else {
                    req.session.destroy();
                    res.clearCookie('remember');
                    return res.render('login', {errors: [
                        {msg: 'Credenciales inválidas'}
                    ], loggedInUser: {name:'Iniciar Sesión'}});
                }
            })
                .then(loginUser => {
                    if(loginUser == undefined) {
                        req.session.destroy();
                        res.clearCookie('remember');
                        return res.render('login', {errors: [
                            {msg: 'Credenciales inválidas'}
                        ], loggedInUser: {name:'Iniciar Sesión'}});
                    }

                    // Creo la session
                    req.session.loggedIn = loginUser;
                    loggedInUser = req.session.loggedIn

                    if(req.body.remember != undefined) {
                        res.cookie('remember', loginUser.email, { maxAge: 6000000 })
                    }

                    res.redirect('/users');

                })

    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/users/login');
    },
    users: (req, res) => {
        res.render('users', {loggedInUser: req.session.loggedIn});
    },
    edit: (req, res) => {
        db.User.findOne({
            where: {
                email: req.params.email
            }
        })
            .then(user => {
                res.render('editProfile', {user:user, loggedInUser: req.session.loggedIn});
            })
    },
    update: (req, res) => {
        let user;
        if(req.files[0] != undefined){
            user = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: `/img/users/${req.files[0].filename}`,
            }
        } else {
            user = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
            }
        }
        
        db.User.update(user, {
            where: {
                email: req.params.email
            }
        })
            .then(() => {
                res.clearCookie('remember');
                req.session.loggedIn = user;
                if(req.body.remember != undefined) {
                    res.cookie('remember', req.session.loggedIn.email, { maxAge: 6000000 })
                }

                res.redirect(`/users`);
            })
    }
}

module.exports = usersController;