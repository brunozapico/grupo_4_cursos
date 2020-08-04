const db = require('../../database/models');

module.exports = {
    create_course: (cart_id, course_id, res) => {
        db.CartCourse.create({
                shopping_cart_id: cart_id,
                course_id: course_id
            })
            .then(course => res.redirect('/shoppingCart'))
            .catch(err => res.json({
                msg: 'ERROR',
                err
            }));
    },
};