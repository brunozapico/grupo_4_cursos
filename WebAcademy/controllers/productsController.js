const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const { programIdBuild, courseGenerator } = require('./helpers/courseHelpers');
const db = require('../database/models');
const Op = db.Sequelize.Op;

let categories = db.Category.findAll({
    include: { association: 'courses' },
});

const productsController = {
    list: (req, res) => {
        categories
        .then(categories => {
                res.render('products', { categories, title: 'Todos nuestros cursos', loggedInUser: req.session.loggedIn })
            })
            .catch(error => console.log(error));
    },
    detail: (req, res) => {
        let courses = db.Course.findByPk(req.params.id, {
            include: [{ association: 'professor' }, { association: 'program' }, { association: 'category' }]
        });

        let admin;

        if (req.session.loggedIn){
            admin = db.Rol.findOne({
                where: {user_id_rol : req.session.loggedIn.id}
                })
        } else {
            admin = null
        };

        Promise.all([categories, courses, admin])
            .then(([categories, courses, admin]) => {
                //BUSCAR UNA LIBRERIA PARA TRABAJAR CON FECHAS
                let startsDate = String(courses.starts_date);
                let start_date = `${startsDate.slice(-2)}/${startsDate.slice(5, 7)}/${startsDate.slice(0, 4)}`;

                let endsDate = String(courses.ends_date);
                let end_date = `${endsDate.slice(-2)}/${endsDate.slice(5, 7)}/${endsDate.slice(0, 4)}`;

                let sinceTime = String(courses.program.since_time);
                let since = sinceTime.slice(0, 5);

                let upToTime = String(courses.program.up_to_time);
                let upTo = upToTime.slice(0, 5);

                res.render('productDetail', { start_date, end_date, since, upTo, courses, categories, loggedInUser: req.session.loggedIn, admin});
            })
            .catch(error => console.log(error))
    },
    create: (req, res, next) => {
        let professor = db.Professor.findAll();
        Promise.all([professor, categories])
            .then(([professor, categories]) => {
                res.render('productForm', { categories, professor, title: 'Carga tu curso', loggedInUser: req.session.loggedIn })
            });
    },
    store: (req, res, next) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let days = req.body.days,
                shift = req.body.shifts,
                programID = programIdBuild(days, shift),
                courseData = courseGenerator(req.body.courseName, req.body.price, req.body.starts_date, req.body.ends_date, `/img/cursos/${req.files[0].filename}`, req.body.vacancies, req.body.outstanding, req.body.description_short, req.body.description_full, req.body.category, req.body.professor, programID);

            db.Course.create(courseData).then(() => {
                res.redirect('/products')
            });
        } else {
            let courseEdit = db.Course.findByPk(req.params.id, {
                include: [{ association: 'category' }, { association: 'professor' }]
            }),

                professor = db.Professor.findAll();

            Promise.all([courseEdit, categories, professor])
                .then(([courses, categories, professor]) => {

                    res.render('productForm', { errors: errors.errors, title: 'Carga tu curso', courses, categories, professor, loggedInUser: req.session.loggedIn });
                });
        };
    },

    edit: (req, res, next) => {
        let courseEdit = db.Course.findByPk(req.params.id, {
            include: [{ association: 'category' }, { association: 'professor' }]
        }),

            professor = db.Professor.findAll();

        Promise.all([courseEdit, categories, professor])
            .then(([courses, categories, professor]) => {
                res.render('productEdit', { courses, categories, professor, loggedInUser: req.session.loggedIn });
            });
    },
    update: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let days = req.body.days;
            shift = req.body.shifts,
                programID = programIdBuild(days, shift),
                courseData = courseGenerator(req.body.courseName, req.body.price, req.body.starts_date, req.body.ends_date, `/img/cursos/${req.files[0].filename}`, req.body.vacancies, req.body.outstanding, req.body.description_short, req.body.description_full, req.body.category, req.body.professor, programID);

            db.Course.update(courseData, {
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    res.redirect(`/products/detail/${req.params.id}`)
                });
        } else {
            let courseEdit = db.Course.findByPk(req.params.id, {
                include: [{ association: 'category' }, { association: 'professor' }]
            }),
                professor = db.Professor.findAll();

            Promise.all([courseEdit, categories, professor])
                .then(([courses, categories, professor]) => {
                    res.render('productEdit', { errors: errors.errors, courses, categories, professor, loggedInUser: req.session.loggedIn });
                });
        }
    },
    destroy: (req, res) => {
        db.UserCourse.destroy({
            where: {
                courses_id: req.params.id
            }
        })
            .then(() => {
                db.Course.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => {
                        res.redirect('/products')
                    })
            })

    },
    search(req, res) { // si no se busca nada te envia a la pagina de todos los cursos.
        if (req.query.q != '') {
            let course = db.Course.findAll({
                where: {
                    name: {
                        [Op.substring]: req.query.q,
                    }
                },
                include: [{ association: 'category' }]
            })

            Promise.all([course, categories])
                .then(([course, categories]) => {
                    res.render('search', { course, categories, title: 'Este es el resultado de tu busqueda', loggedInUser: req.session.loggedIn })
                })
        } else {
            res.redirect('/products');
        }
    }
}

module.exports = productsController;