const db = require('../database/models');

const categories = db.Category.findAll({
    include: { association: 'courses'}
})

module.exports = {
    list(req, res) {
    categories      
        .then(categories => res.render('products', { categories, title: 'Todas las categorias', loggedInUser: req.session.loggedIn }))
    },
    detail(req, res) {
        const category = db.Category.findByPk(req.params.id, {
            include: { association:'courses'}
        })
        Promise.all([categories, category])
        .then(([categories, category]) => res.render('categories', {categories, category, loggedInUser: req.session.loggedIn, title: `${category.title}`}))
    }
}