const fs = require('fs');
const courses = JSON.parse(fs.readFileSync(__dirname + '../data/courses.json', 'utf-8'));

module.exports = {
    detail: (req, res) => {

        course = courses.find((course) => {
            return req.params.id == course.id
        });
        
        res.render('productDetail', {course})
    }
}