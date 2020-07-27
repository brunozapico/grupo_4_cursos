const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        
        let result = db.Category.findAll({include: [{ association: 'courses' }]}),
            totalCourses = result;
        
        Promise.all([totalCourses, result])
            .then(([totalCourses, result]) => {
                let categories = {
                    meta: {
                        status: 200,
                        url: '/api/categories',
                        total: totalCourses.length
                    },
                    data: result
                }
                res.status(200).json(categories)
            })
            .catch(error => {
                res.status(400).json({
                    status: "error",
                    code: "400",
                    message: "Bad Request",
                    info: "Categories not found.",
                    error: error
                });
            });
    },
    detail: (req, res) => {
        db.Category.findOne({
                where: {id: req.params.id},
                include: [{ association: 'courses' }]
            })
            .then(category => {
                category.setDataValue('url', `http://localhost:3000/api/categories/${req.params.id}`);

                let answer = {
                    meta: {
                        status: 200,
                        categories_url: 'http://localhost:3000/api/categories',
                    },
                    category: category,
                };
                res.status(200).json(answer);
            })
            .catch(error => {
                res.status(404).json({
                    status: "error",
                    code: "404",
                    message: "Not Found",
                    info: "Category out of range or not found.",
                    error: error
                });
            });
    },
};