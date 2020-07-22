module.exports = {
    create_fullUser: (name, email, password, avatar) => {
        let user = {
            name: name,
            email: email,
            password: password,
            avatar: avatar,
        };

        return user;
    }, 
    create_noAvatarUser: (name, email, password) => {
        let user = {
            name: name,
            email: email,
            password:password,
        };

        return user;
    },   
    update_fullUser: (id, name, email, password, avatar) => {
        let user = {
            id: id,
            name: name,
            email: email,
            password: password,
            avatar: avatar,
        };

        return user;
    },
    update_noAvatarUser: (id, name, email, password) => {
        let user = {
            id: id,
            name: name,
            email: email,
            password:password,
        };

        return user;
    },
};