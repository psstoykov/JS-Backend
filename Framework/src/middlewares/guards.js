module.exports = {
    isGuest: () => {
        return function (req, res, next) {
            if (req.user) {
                res.redirect('/');
            } else {
                next();
            }
        }
    },
    isUser: () => {
        return function (req, res, next) {
            if (!req.user) {
                res.redirect('/login')
            } else {
                next();
            }
        }
    }
}