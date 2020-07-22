const db = require('../../database/models');
const programIdBuild = require('../helpers/programIdBuild');

/* let dataCreateUpdeta = {
    name: req.body.courseName,
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
}
 */
module.exports = {
    list: (req, res) => {
        let pageQty = req.query.pageQty ? Number(req.query.pageQty) : 10,
        start = req.query.start ? Number(req.query.start) : 0
        db.Course.findAll({
            include: [{ association: 'category' }, { association: 'professor' }, { association: 'program' }],
            offset: start,
            limit: pageQty,
        }).then(result => {
            let next_page = null,
            prev_page = null,
            first_page = `http://localhost:3000/api/products?start=0&pageQty=${pageQty}`;
            
            result.length == pageQty ? next_page = `http://localhost:3000/api/products?start=${start + pageQty}&pageQty=${pageQty}` : next_page;
            
            start >= pageQty ? prev_page = `http://localhost:3000/api/products?start=${start - pageQty}&pageQty=${pageQty}` : prev_page;
            
            
            for (let course of result) {
                course.setDataValue('endpoint', '/api/products/' + course.id);
            }
            let courses = {
                meta: {
                    status: 200,
                    total: result.length
                },
                pagination: {
                    next_page,
                    prev_page,
                    first_page,
                },
                data: result
            }
            res.json(courses);
        }).catch(() =>
        res.status(404).json({
            status: 'error',
            code: '404',
            info: 'Product not found',
            messege: 'Bad request'
            
        }));
    },
    
    detail: (req, res) => {
        db.Course.findByPk(req.params.id, {
            include: [{ association: 'category' }, { association: 'professor' }, { association: 'program' }]
        }).then(result => {
            let course = {
                meta: {
                    status: 200,
                    url: '/api/products/' + result.id
                },
                data: result
            }
            res.json(course);
        }).catch(() =>
        res.status(404).json({
            status: 'error',
            code: '404',
            info: 'Product not found',
            messege: 'Bad request'
            
        }))
    },
    
    create: (req, res) => {
        let errors = true   // no se sabe si tendriamos que validarlos
        if (errors) {
            res.status(422).json(errors).end()
        } else {
            let days = req.body.days;
            let shift = req.body.shifts;
            let programID;
            
            if (days == 'Lunes - Miercoles - Viernes' && shift == 'm') {
                programID = 1;
            } else if (days == 'Lunes - Miercoles - Viernes' && shift == 't') {
                programID = 2;
            } else if (days == 'Lunes - Miercoles - Viernes' && shift == 'n') {
                programID = 3;
            } else if (days == 'Martes - Jueves - Sábado' && shift == 'm') {
                programID = 4;
            } else if (days == 'Martes - Jueves - Sábado' && shift == 't') {
                programID = 5;
            } else if (days == 'Martes - Jueves - Sábado' && shift == 'n') {
                programID = 6;
            }
            
            
            db.Course.create({
                name: req.body.courseName,
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
                res.status(200).json({
                    status: "Curso creado"
                }).end()
            });
        }
    },
    
    update: (req, res) => {
        let errors = true;
        
        if (errors) {
            res.status(422).json(errors).end()
        } else {
            
            let days = req.body.days;
            let shift = req.body.shifts;
            let programID;
            
            if (days == 'Lunes - Miercoles - Viernes' && shift == 'm') {
                programID = 1;
            } else if (days == 'Lunes - Miercoles - Viernes' && shift == 't') {
                programID = 2;
            } else if (days == 'Lunes - Miercoles - Viernes' && shift == 'n') {
                programID = 3;
            } else if (days == 'Martes - Jueves - Sábado' && shift == 'm') {
                programID = 4;
            } else if (days == 'Martes - Jueves - Sábado' && shift == 't') {
                programID = 5;
            } else if (days == 'Martes - Jueves - Sábado' && shift == 'n') {
                programID = 6;
            }
            
            db.Course.update({
                name: req.body.courseName,
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
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.status(200).json({
                    status: "Curso actualizado"
                }).end()
            });
        };
    },
    
    delete: (req, res) => {
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
                res.status(200).json({
                    status: "Curso eliminado"
                }).end()
            })
        });
    }
};