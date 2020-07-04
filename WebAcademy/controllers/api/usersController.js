const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        db.User.findAll({
            attributes: ['id', 'name', 'email']
        })
            .then( users => {
                for (let i = 0; i < users.length; i++) {
                    users[i].setDataValue('detail', `/api/users/${users[i].id}`);
                };
                
                let answer = {
                    meta: {
                        status: 200,
                        count: users.length,
                        url: '/api/users'
                    },
                    users: users    
                };
                
                res.status(200).json(answer);
            });
    },
    detail: (req, res) => {
        db.User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'email', 'avatar']
        })
            .then( user => {
                if(user) {
                    user.setDataValue('users_url', `/api/users`);
                    
                    let answer = {
                        meta: {
                            status: 200,
                            url: `/api/users/${req.params.id}`
                        },
                        user
                    };
                    res.status(200).json(answer);
                } else {
                    res.status(404).json({ status:"error", code:"404", message:"Not Found", info:"User not found" });
                };
            });
    },
};