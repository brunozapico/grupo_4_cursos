let db = require('../database/models');

module.exports = {
    detail(req, res) {
        let courseLimit = req.query.limit ? null : 3;
        let categories = db.Category.findAll({
            include: { association: 'courses'}
        });
        let category = db.Category.findByPk(req.params.id, {
            include: { association:'courses', 
        limit: courseLimit}
        })
        Promise.all([categories, category])
        .then(([categories, category]) => res.render('categories', {categories, category, loggedInUser: req.session.loggedIn, title: `Todos los cursos de la categoria ${category.title}`}))
    }
}