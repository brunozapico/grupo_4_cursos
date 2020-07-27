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
};