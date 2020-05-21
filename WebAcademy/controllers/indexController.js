const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const tips = require('../data/tipsDataBase.json');
const products = require('../data/products.json');
const categories = require('../data/categoriesDataBase.json');
const outstandingProducts = products.filter(product => {
    return product.outstanding == "true";
});

const indexController = {
    index: (req, res) => {
        res.render('index', {products, outstandingProducts, categories, tips});
    },
    register: (req, res) => {
        res.render('register');
    },
    create: (req, res) => {
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        
        let usersDataBase = fs.readFileSync(path.join(__dirname, "..", "data", "usersDataBase.json"), {encoding:'UTF-8'});

        let users;
        if (usersDataBase == ""){
            users = [];
        } else {
            users = JSON.parse(usersDataBase);
        }

        users.push(user);
        
        usersJSON = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, "..", "data", "usersDataBase.json"), usersJSON);

        res.redirect('/');
    }
}

module.exports = indexController;