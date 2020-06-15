onst fs = require('fs');
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

        // let user = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: bcrypt.hashSync(req.body.password, 10),
        //     avatar: req.files[0].filename
        // }
        
        // let usersDataBase = fs.readFileSync(path.join(__dirname, "..", "data", "users.json"), {encoding:'UTF-8'});

        // let users;
        // if (usersDataBase == ""){
        //     users = [];
        // } else {
        //     users = JSON.parse(usersDataBase);
        // }

        // users.push(user);
        
        // usersJSON = JSON.stringify(users);

        // fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"), usersJSON);

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
                if (loginUser != '') {
                    return loginUser
                }
            })
                .then(loginUser => {
                    if(loginUser == undefined) {
                        req.session.destroy(); // borra session
                        res.clearCookie('remember'); // borra cookies
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

        // console.log(`Soy el: ${loginUser}`)
        
        // let usersDataBase = fs.readFileSync(path.join(__dirname, "..", "data", "users.json"), {encoding:'UTF-8'});

        // let users;
        // if (usersDataBase == ""){
        //     users = [];
        // } else {
        //     users = JSON.parse(usersDataBase);
        // }
        
        // let loginUser;
        // for(let i = 0; i < users.length; i++) {
        //     if(users[i].email == req.body.email) {
        //         if(bcrypt.compareSync(req.body.password, users[i].password)) {
        //             loginUser = users[i];
        //             break;
        //         }
        //     }
        // }
        
        // if(loginUser == undefined) {
        //     req.session.destroy(); // borra session
        //     res.clearCookie('remember'); // borra cookies
        //     return res.render('login', {errors: [
        //         {msg: 'Credenciales inválidas'}
        //     ], loggedInUser: {name:'Iniciar Sesión'}});
        // }
        
        // // Creo la session
        // req.session.loggedIn = loginUser;
        // loggedInUser = req.session.loggedIn

        // if(req.body.remember != undefined) {
        //     res.cookie('remember', loginUser.email, { maxAge: 6000000 })
        // }

        // res.redirect('/users');

    },
    logout: (req, res) => {
        req.session.destroy(); // borra session
        res.clearCookie('remember'); // borra cookies
        res.redirect('/users/login');
    },
    users: (req, res) => {
        res.render('users', {loggedInUser: req.session.loggedIn});
    },
}

module.exports = usersController;