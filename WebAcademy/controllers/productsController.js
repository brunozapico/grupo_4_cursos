const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    list: (req, res) => {
        db.Category.findAll({
            include: [{ association: 'courses' }]
        }).then(categories => {
            //res.json(categories)
            res.render('products', { categories, title: 'Todos nuestros cursos', loggedInUser: req.session.loggedIn })
        });
    },
    create: (req, res, next) => {
        db.Category.findAll({ //tengo que seguir pasandole todos los datos para la navegacion
            include: [{ association: 'courses'}, {association: 'program' }]
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
            image: `/img/cursos/${req.files[0].filename}`,
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
        let categories = db.Category.findAll({
            include: [{ association: 'courses' }]
        });
        let courses = db.Course.findByPk(req.params.id, {
            include: [/* {association : 'professors'}, {association : 'program'}, */ {association : 'category'}]
        });
        Promise.all([categories, courses])    
        .then(([categories, courses]) => {
              // res.json(courses, categories)
                res.render('productDetail', {categories, courses, loggedInUser: req.session.loggedIn});
            });
    },
    edit: (req, res, next) => {
        let courseEdit = db.Course.findByPk(req.params.id);
        let categoryEdit = db.Category.findAll();

            Promise.all([courseEdit, categoryEdit])
            .then(([courses, categories]) => {
                res.render('productEdit', {courses, categories, loggedInUser: req.session.loggedIn});
            });
    },
    update: (req, res, next) => {
            db.Course.update({
                name: req.body.name,
                price: req.body.price,
                starts_date: req.body.starts_date,
                ends_date: req.body.ends_date,
                image: `/img/cursos/${req.files[0].filename}`,
                vacancies: req.body.vacancies,
                outstanding: req.body.outstanding,
                description_short: req.body.description_short,
                description_full: req.body.description_full,
                category_id: req.body.categoty,
                professor_id: req.body.professor
            },{
                where :{
                    id : req.params.id}
            })
            .then( () =>{
                res.redirect(`/products/detail/${req.params.id}`)
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
    )},
    search(req,res) {
        let resultadoBusqueda  = db.Course.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.q,
                }
            },
            include: [{association: 'category'}]
        })
        let categories = db.Category.findAll({
            include: { association: 'courses' }
        })

        Promise.all([resultadoBusqueda, categories])

        .then(([course, categories]) => {
            res.render('search', {course, categories, title: 'Este es el resultado de tu busqueda', loggedInUser: req.session.loggedIn})
        })
    }
}


module.exports = productsController