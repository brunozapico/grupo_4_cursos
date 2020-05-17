const fs = require('fs')
const categories = require('../data/categoriesDataBase.json')

// console.log(categories)

const indexController = {
    index: function(req, res, next) {
        res.render('index', {categories});
    }
}

module.exports = indexController;