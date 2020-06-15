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
        res.render('productForm', { loggedInUser: req.session.loggedIn })
    },
    store: (req, res, next) => {

        let product = {
            category: req.body.category,
            category_image: req.files[0].filename,
            days: req.body.days,
            description: req.body.description,
            description_short: req.body.description_short,
            end: `${req.body.end.slice(-2)}-${req.body.end.slice(5, 7)}-${req.body.end.slice(0, 4)}`,
            id: Date.now(),
            image: req.files[1].filename,
            name: req.body.name,
            outstanding: req.body.outstanding,
            price: req.body.price,
            start: `${req.body.start.slice(-2)}-${req.body.start.slice(5, 7)}-${req.body.start.slice(0, 4)}`,
            time: req.body.time,
            vacancies: req.body.vacancies
        }

        let productsDB = fs.readFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json'), { encoding: 'UTF-8' })

        let products;
        if (productsDB == "") {
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
        let id = products.findIndex(product => {
            return product.id == req.params.id
        });

        let product = products[id];

        res.render('productDetail', { product, loggedInUser: req.session.loggedIn });
    },
    edit: (req, res, next) => {
        let id = products.findIndex(product => {
            return product.id == req.params.id
        });

        let product = products[id];

        res.render('productEdit', { product, loggedInUser: req.session.loggedIn });
    },
    update: (req, res, next) => {
        let product = {
            category: req.body.category,
            category_image: req.files[0].filename,
            days: req.body.days,
            description: req.body.description,
            description_short: req.body.description_short,
            end: `${req.body.end.slice(-2)}-${req.body.end.slice(5, 7)}-${req.body.end.slice(0, 4)}`,
            id: Date.now(),
            image: req.files[1].filename,
            name: req.body.name,
            outstanding: req.body.outstanding,
            price: req.body.price,
            start: `${req.body.start.slice(-2)}-${req.body.start.slice(5, 7)}-${req.body.start.slice(0, 4)}`,
            time: req.body.time,
            vacancies: req.body.vacancies
        };
        let products = JSON.parse(fs.readFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json'), { encoding: 'UTF-8' }))

        let id = products.findIndex(product => {
            return product.id == req.params.id;
        })

        products[id] = product;

        productsDB = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json'), productsDB);

        res.redirect('/products');

    },
    destroy: (req, res) => {
        let products = JSON.parse(fs.readFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json'), { encoding: 'UTF-8' }))

        products = products.filter(product => {
            return product.id != req.params.id;
        })

        productsDB = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname + '/../' + 'data/' + 'products.json'), productsDB);

        res.redirect('/products');
    }
}


module.exports = productsController