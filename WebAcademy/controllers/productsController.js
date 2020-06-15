const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {
    list: (req, res) => {
        res.render('products', {
            artProducts,
            developmentProducts,
            personalDevelopmentProducts,
            designProducts,
            photografyProducts,
            computingProducts,
            marketingProducts,
            businessProducts,
            loggedInUser: req.session.loggedIn
        });
    },
    create: (req, res, next) =>{
        res.render('productForm', {loggedInUser: req.session.loggedIn})
    },
    store: (req, res, next) =>{
        
        let product = {
            category: req.body.category,
            category_image: req.files[0].filename,
            days: req.body.days,
            description: req.body.description,
            description_short: req.body.description_short,
            end: `${req.body.end.slice(-2)}-${req.body.end.slice(5,7)}-${req.body.end.slice(0,4)}`,
            id: Date.now(),
            image: req.files[1].filename,
            name: req.body.name,
            outstanding: req.body.outstanding,
            price: req.body.price,
            start: `${req.body.start.slice(-2)}-${req.body.start.slice(5,7)}-${req.body.start.slice(0,4)}`,
            time: req.body.time,
            vacancies: req.body.vacancies
        }
        
        let productsDB = fs.readFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json') , {encoding: 'UTF-8'})
        
        let products;
        if (productsDB == ""){
            products = []
        } else {
            products = JSON.parse(productsDB);
        }
        
        products.push(product);
        
        productsDB = JSON.stringify(products);
        
        fs.writeFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json'), productsDB);

        res.redirect('/products');
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