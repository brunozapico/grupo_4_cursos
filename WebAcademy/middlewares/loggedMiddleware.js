module.exports = (req, res, next) => {
    if(req.session.loggedIn == undefined) {
        return next();
    } else {
        res.redirect('/users');
    }
}