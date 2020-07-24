const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        let total_qty = db.User.findAll()

        let start = req.query.start ? Number(req.query.start) : 0,
            rpp = 10,
            users_list;

        let users = db.User.findAndCountAll({
                attributes: ['id', 'name', 'email'],
                limit: rpp,
                offset: start,
            })

        Promise.all([total_qty, users])
            .then(([total_qty, users]) => {
                let next = null,
                    previous = null,
                    first = 'http://localhost:3000/api/users?start=0';

                users.rows.length == rpp ? next = `http://localhost:3000/api/users?start=${(rpp + start)}` : next;

                start > 9 ? previous = `http://localhost:3000/api/users?start=${(start - rpp)}` : previous;

                for (let i = 0; i < users.rows.length; i++) {
                    users.rows[i].setDataValue('detail', `/api/users/${users.rows[i].id}`);
                };

                users.rows.length == 0 ?
                    users_list = 'Límite de la base de datos excedido. No existen más usuarios, volver al inicio.' :
                    users_list = users.rows;

                let answer = {
                    meta: {
                        status: 200,
                        url: '/api/users',
                        count: total_qty.length,
                        pagination: {
                            first,
                            next,
                            previous,
                        },
                    },
                    users: users_list,
                };

                res.status(200).json(answer);
            })
            .catch(error => {
                res.status(400).json({
                    status: "error",
                    code: "400",
                    message: "Bad Request",
                    info: "Users not found."
                });
            });
    },
    detail: (req, res) => {
        db.User.findOne({
                where: {id: req.params.id},
                attributes: ['id', 'name', 'email', 'avatar'],
            })
            .then(user => {
                user.setDataValue('url', `/api/users/${req.params.id}`);

                let answer = {
                    meta: {
                        status: 200,
                        users_url: '/api/users',
                    },
                    user,
                };
                res.status(200).json(answer);
            })
            .catch(error => {
                res.status(404).json({
                    status: "error",
                    code: "404",
                    message: "Not Found",
                    info: "User out of range or not found.",
                });
            });
    },
};