const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        
        let result = db.Category.findAll({
            include: [{ association: 'courses' }]
        })

        let totalCourses = result

        Promise.all([totalCourses, result])
            .then(([totalCourses, result]) => {
                let categories = {
                    meta: {
                        status: 200,
                        total: totalCourses.length
                    },
                    data: result
                }
                res.json(categories)
            }
            )
            .catch(err => res.json(err));
    },
};