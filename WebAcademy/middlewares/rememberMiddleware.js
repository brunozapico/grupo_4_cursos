const fs = require('fs')
const path = require('path');

module.exports = (req, res, next) => {
    
    if (req.cookies.remember != undefined && req.session.loggedIn == undefined) {
        let usersDataBase = fs.readFileSync(path.join(__dirname, "..", "data", "users.json"), {encoding:'UTF-8'});

        let users;
        if (usersDataBase == ""){
            users = [];
        } else {
            users = JSON.parse(usersDataBase);
        }
        
        let loginUser;
        for(let i = 0; i < users.length; i++) {
            if(users[i].email == req.cookies.remember) {
                loginUser = users[i];
                break;
            }
        }

        req.session.loggedIn = loginUser;
    }

    return next();

}