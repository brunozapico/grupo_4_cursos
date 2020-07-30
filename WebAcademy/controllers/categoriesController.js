const db = require('../database/models');

const categories = db.Category.findAll({
    include: { association: 'courses'}
})

module.exports = {
    // list(req, res) {
    // categories      
    //     .then(categories => res.render('products', { categories, title: 'Todas las categorias', loggedInUser: req.session.loggedIn }))
    // },
    detail(req, res) {
        let courseLimit = req.query.limit ? null : 3;
        const category = db.Category.findByPk(req.params.id, {
            include: { association:'courses', 
        limit: courseLimit}
        })
        Promise.all([categories, category])
        .then(([categories, category]) => res.render('categories', {categories, category, loggedInUser: req.session.loggedIn, title: `Todos los cursos de la categoria ${category.title}`}))
    }
}