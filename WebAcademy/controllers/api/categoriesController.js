const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        db.Category.findAll()
            .then(categories => res.status(200).json(categories))
            .catch(err => res.json(err));
    },
};