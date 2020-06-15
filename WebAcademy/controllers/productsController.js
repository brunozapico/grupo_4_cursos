const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    list: (req, res) => {
        db.Category.findAll({
            include: { associations: 'course' }
        }).then(categories => {
            res.render('products', { categories, title: 'Todos nuestros cursos', loggedInUser: req.session.loggedIn })
        });
    },
    create: (req, res, next) => {
        db.Category.findAll({ //tengo que seguir pasandole todos los datos para la navegacion
            include: { associations: 'course', associations: 'program' }
        }).then(categories => {
            res.render('productsForm', { categories, title: 'Carga tu curso', loggedInUser: req.session.loggedIn })
        });
    },
    store: (req, res, next) => {
        db.Course.create({
            name: req.body.name,
            price: req.body.price,
            starts_date: req.body.starts_date,
            ends_date: req.body.ends_date,
            image: req.body, //completar
            vacancies: req.body.vacancies,
            outstanding: req.body.outstanding,
            description_short: req.body.description_short,
            description_full: req.body.description_full,
            category_id: req.body.categoty,
            professor_id: req.body.professor
        }).then(() => {
            res.redirect('/products')
        });
    },
    detail: (req, res) => {
        db.Course.findByPk(req.params.id, {
            includ: [{association : 'professors'}, {association : 'program'}, {association : 'categories'}]
        })
            .then(course =>{
                res.render('productDetail', {course, loggedInUser: req.session.loggedIn});
            });
        
    },
    edit: (req, res, next) => {
        let courseEdit = db.Course.findByPk(req.params.id);
        let categoryEdit = db.Category.findAll();

            Promise.all([courseEdit, categoryEdit])
            .then(([Course, Category]) => {
                res.render('productEdit', {Course:Course, Category:Category, loggedInUser: req.session.loggedIn});
            });
    },
    update: (req, res, next) => {
            db.Course.update({
                name: req.body.name,
                price: req.body.price,
                starts_date: req.body.starts_date,
                ends_date: req.body.ends_date,
                image: req.body.image,
                vacancies: req.body.vacancies,
                outstanding: req.body.outstanding,
                description_short: req.body.description_short,
                description_full: req.body.description_full
            },{
                where :{
                    id : req.params.id}
            })
            .then( () =>{
                res.redirect('/products')
            });
    },
    destroy : (req, res) => {
        db.Course.destroy({
            where : {
                id :req.params.id
                }
            }
            .then(()=>{
                res.redirect('/products')
            })
    )}
}


module.exports = productsController