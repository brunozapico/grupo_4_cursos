const db = require('../database/models');

let categories = db.Category.findAll({
    include: { association: 'courses'}
});

module.exports = {
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