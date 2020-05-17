const categories = require('../data/categoriesDataBase.json');
const tips = require('../data/tipsDataBase.json');

const indexController = {
    index: function(req, res) {
        res.render('index', {categories, tips});
    }
}

module.exports = indexController;