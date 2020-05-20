const fs = require('fs');
const path = require('path');

const products = require('../data/products.json');

const productsController = {
    create: (req, res, next) =>{
        res.render('productForm')
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
        
        /* res.redirect('/products'); */
        res.send('GUARDADO...')
    }
}


module.exports = productsController