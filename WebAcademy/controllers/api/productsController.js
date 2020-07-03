const db = require('../../database/models');

module.exports = {
    list: (req, res) =>{
        db.Course.findAll({
            include: [{association:'category'}],
            offset: req.query.start ? Number(req.query.start): 0,
            limit: 10,
        }).then(result => {
            for(let course of result){
                course.setDataValue('endpoint', '/api/products/' + course.id);
            }
            let courses = {
                meta: {
                    status: 200,
                    total: result.length
                },
                data: result,
                pagination: {
                    next_page:'?start=10',
                    prev_page:'?start=0'
                }
            }
            res.json(courses);
        });
    },

    detail: (req, res) => {
        db.Course.findByPk(req.params.id, {
            include: [{association:'category'}, {association:'professor'}, {association:'program'}]
        }).then( result => {
            let course = {
                meta: {
                    status: 200,
                    url: '/api/products/' + result.id
                },
                data: result
            }
            res.json(course);
        });
    },

    create: (req, res) => {
        let errors = true   // no se sabe si tendriamos que validarlos
        if(errors){
            res.status(422).end()
        }else{
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
                res.status(200).end()
            });
        }
    },

    update: (req, res) => {
        let errors = true;

        if (!errors){
            
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
            },{
                where :{
                    id : req.params.id}
            })
            .then( () =>{
                res.status(200).end()
            });
        } else {
            res.status(422).end()
        };

    },

    delete: (req, res) => {
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
                    res.status(200).end()
                })
        });
    }
};