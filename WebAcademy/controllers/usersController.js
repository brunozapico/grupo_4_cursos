const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const usersController = {
    register: (req, res) => {
        db.Category.findAll({include: {association: 'courses'}})
        .then(categories => {
            res.render('register', {categories, loggedInUser: req.session.loggedIn});
        });
    },
    create: (req, res) => {
        let categories = db.Category.findAll({include: {association: 'courses'}}),
        registerUser = db.User.findOne({where: {email: req.body.email}});
        
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('register', {errors: errors.errors, categories, loggedInUser: req.session.loggedIn});
        } else {
            Promise.all([categories, registerUser])
            .then(([categories, registerUser]) => {
                if(registerUser != null){
                    res.render('register', {errors: [
                        {msg: 'Esa dirección de correo electrónico ya está siendo utilizada por otro usuario.'}
                    ], loggedInUser: {name:'Iniciar Sesión'}, categories});
                } else {
                    let user;
                    if(req.files[0] != undefined){ // si hay avatar
                        user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                            avatar: `/img/users/${req.files[0].filename}`,
                        }
                    } else { // si no hay avatar
                        user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                        };
                    };
                    
                    db.User.create(user)
                    .then(() => {
                        db.User.findOne({where: {email: user.email}})
                        .then(newUser => {
                            req.session.loggedIn = newUser;
                            res.cookie('remember', user.id, { maxAge: 6000000 });
                            
                            res.render('users', {categories, loggedInUser: req.session.loggedIn});
                        });
                    })
                };
            });
        };
    },
    login: (req, res) => {
        db.Category.findAll({include: {association: 'courses'}})
        .then(categories => {
            res.render('login', {categories, loggedInUser: req.session.loggedIn});
        });
    },
    processLogin: (req, res) => {
        let categories = db.Category.findAll({include: {association: 'courses'}}),
        loginUser = db.User.findOne({where: {email: req.body.email}});
        
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('login', {errors: errors.errors, loggedInUser: {name:'Iniciar Sesión'}, categories});
        } else {
            Promise.all([categories, loginUser])
            .then(([categories, loginUser]) => {
                if ((loginUser != null && bcrypt.compareSync(req.body.password, loginUser.password)) || (loginUser != null && req.body.password === loginUser.password)) { 
                    // en la database tenemos contraseñas no encriptadas, por eso tengo que verificar tambien sin el bcrypt, en un futuro seria solo con bcrypt.
                    
                    req.session.loggedIn = loginUser;
                    loggedInUser = req.session.loggedIn;
                    
                    if(req.body.remember != undefined) {
                        res.cookie('remember', loginUser.id, { maxAge: 6000000 });
                    };
                    
                    res.render('users', {categories, loggedInUser: req.session.loggedIn});
                } else {
                    req.session.destroy();
                    res.clearCookie('remember');
                    res.render('login', {errors: [
                        {msg: 'Credenciales inválidas'}
                    ], loggedInUser: {name:'Iniciar Sesión'}, categories});
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
        db.Category.findAll({include: {association: 'courses'}})
        .then(categories => {
            res.render('users', {categories, loggedInUser: req.session.loggedIn});
        });
    },
    edit: (req, res) => {
        let categories = db.Category.findAll({include: {association: 'courses'}}),
        user = db.User.findOne({where: {id: req.params.id}});
        
        Promise.all([categories, user])
        .then(([categories, user]) => {
            res.render('editProfile', {user:user, loggedInUser: req.session.loggedIn, categories});
        });
    },
    update: (req, res) => {
        let categories = db.Category.findAll({include: {association: 'courses'}});
        let previousUser;
        
        db.User.findOne({where: {id: req.params.id}}).then(user => {previousUser = user})
        .then(() => {
            let user;

        if(req.files[0] != undefined){
            user = {
                id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: `/img/users/${req.files[0].filename}`,
            };
        } else {
            if(previousUser.avatar != undefined){
                user = {
                    id: req.params.id,
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    avatar: previousUser.avatar,
                } 
            } else {
                user = {
                    id: req.params.id,
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                };
            }
        }
        let update = db.User.update(user, {where: {id: req.params.id}});
        
        Promise.all([categories, update, user])
        .then(([categories, update, user]) => {
            update;
            res.clearCookie('remember');
            req.session.loggedIn = user;
            if(req.body.remember != undefined) {
                res.cookie('remember', req.session.loggedIn.id, { maxAge: 6000000 })
            };
            res.render('users', {categories, loggedInUser: req.session.loggedIn});
        });
        })

        
    },
    destroy: (req, res) => {
        db.User.destroy({where: {id: req.params.id}})
        .then(user => {
            req.session.destroy();
            res.clearCookie('remember');
            res.redirect('/users/login');
        })
        // FALTARIA CASCADE O ELIMINAR TODA TABLA RELACIONADA A ESE USER
    }
};

module.exports = usersController;