const tips = require('../data/tipsDataBase.json');
const products = require('../data/products.json');
const categories = require('../data/categoriesDataBase.json');
const outstandingProducts = products.filter(product => {
    return product.outstanding == "true";
});

const indexController = {
    index: (req, res) => {
        res.render('index', {products, outstandingProducts, categories, tips, loggedInUser: req.session.loggedIn});
    },
    shoppingCart: (req, res) => {
        res.render('shoppingCart', {loggedInUser: req.session.loggedIn})
    }
}

module.exports = indexController;