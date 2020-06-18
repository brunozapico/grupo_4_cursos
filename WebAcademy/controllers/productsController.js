const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    list: (req, res) => { // funciona la logica, revisar vista
        db.Category.findAll({
            include: [{ association: 'courses' }]
        }).then(categories => {
            //res.json(categories)
            res.render('products', { categories, title: 'Todos nuestros cursos', loggedInUser: req.session.loggedIn })
        });
    },
    create: (req, res, next) => { // funciona la logica, revisar vista
        let professor = db.Professor.findAll();

        let categorie = db.Category.findAll({ //tengo que seguir pasandole todos los datos para la navegacion
            include: [{ association: 'courses'}, /*{association: 'program' }*/]
        });
        Promise.all([professor, categorie])
        .then(([professor, categories]) => {
            res.render('productForm', { categories, professor, title: 'Carga tu curso', loggedInUser: req.session.loggedIn })
        });
    },
    store: (req, res, next) => {
        let days = req.body.days;
        let shift = req.body.shifts;
        let programID;

        if(days == 'Lunes - Miercoles - Viernes' && shift == 'm'){
            programID = 1;
        } else if(days == 'Lunes - Miercoles - Viernes' && shift == 't') {
            programID = 2;
        } else if(days == 'Lunes - Miercoles - Viernes' && shift == 'n') {
            programID = 3;
        } else if(days == 'Martes - Jueves - Sábado' && shift == 'm') {
            programID = 4;
        } else if(days == 'Martes - Jueves - Sábado' && shift == 't') {
            programID = 5;
        } else if(days == 'Martes - Jueves - Sábado' && shift == 'n') {
            programID = 6;
        }

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
            category_id: req.body.category,
            professor_id: req.body.professor,
            program_id: programID
        }).then(() => {
            res.redirect('/products')
        });
    },
    detail: (req, res) => { // falta que muestre el horario y los dias
        let categories = db.Category.findAll({
            include: { association: 'courses' }
        })
        let courses = db.Course.findByPk(req.params.id, {
            include: [{association : 'professor'}, {association : 'program'}, {association : 'category'}]
        })
        Promise.all([categories, courses])
            .then(([categories, courses]) =>{
                
                let startsDate = String(courses.starts_date);
                let start_date = `${startsDate.slice(-2)}/${startsDate.slice(5, 7)}/${startsDate.slice(0, 4)}`;

                let endsDate = String(courses.ends_date);
                let end_date = `${endsDate.slice(-2)}/${endsDate.slice(5, 7)}/${endsDate.slice(0, 4)}`;

                let sinceTime = String(courses.program.since_time);
                let since = sinceTime.slice(0,5);

                let upToTime = String(courses.program.up_to_time);
                let upTo = upToTime.slice(0,5);

                res.render('productDetail', {start_date, end_date, since, upTo, courses, categories, loggedInUser: req.session.loggedIn});
            });
        
    },
    edit: (req, res, next) => { // funciona la logica, revisar vista. //falta traer fecha, dias y horario
        let courseEdit = db.Course.findByPk(req.params.id, {
            include: [{association: 'category'},{association: 'professor'}]
        });
        let categoryEdit = db.Category.findAll({
            include: {association: 'courses'}
        });

        let professor = db.Professor.findAll();

            Promise.all([courseEdit, categoryEdit, professor])
            .then(([courses, categories, professor]) => {
                res.render('productEdit', {courses, categories, professor, loggedInUser: req.session.loggedIn});
            });
    },
    update: (req, res) => {
        let days = req.body.days;
        let shift = req.body.shifts;
        let programID;

        if(days == 'Lunes - Miercoles - Viernes' && shift == 'm'){
            programID = 1;
        } else if(days == 'Lunes - Miercoles - Viernes' && shift == 't') {
            programID = 2;
        } else if(days == 'Lunes - Miercoles - Viernes' && shift == 'n') {
            programID = 3;
        } else if(days == 'Martes - Jueves - Sábado' && shift == 'm') {
            programID = 4;
        } else if(days == 'Martes - Jueves - Sábado' && shift == 't') {
            programID = 5;
        } else if(days == 'Martes - Jueves - Sábado' && shift == 'n') {
            programID = 6;
        }
        
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
                category_id: req.body.category,
                professor_id: req.body.professor,
                program_id: programID
            },{
                where :{
                    id : req.params.id}
            })
            .then( () =>{
                res.redirect(`/products/detail/${req.params.id}`)
            });
    },
    destroy : (req, res) => {
        db.UserCourse.destroy({
            where : {
                courses_id : req.params.id
            }
        })
        .then(() => {
            db.Course.destroy({
                where : {
                    id :req.params.id
                    }
                })
                .then(()=>{
                    res.redirect('/products')
                })
        })
            
    },
    search(req,res) { // si no se busca nada, que quede ahi
        if(req.query.q != ''){
            let course  = db.Course.findAll({
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
    
            Promise.all([course, categories])
    
            .then(([course, categories]) => {
                res.render('search', {course, categories, title: 'Este es el resultado de tu busqueda', loggedInUser: req.session.loggedIn})
             })
        }
    },
    programs(req, res){
        db.Program.findAll({
            attributes: [id[0]]
        })
        .then(programs => {
            res.json(programs.days)
        })
    }
}


module.exports = productsController