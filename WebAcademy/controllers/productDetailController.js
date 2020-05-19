const courses = require('../data/courses.json');

module.exports = {
    detail: (req, res) => {

        course = courses.find((course) => {
            return req.params.id == course.id
        });
        
        res.render('productDetail', {course})
    }
}