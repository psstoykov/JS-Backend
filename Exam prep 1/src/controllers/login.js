module.exports = {
    loginGet: async (req, res) => {
        res.render('login')
    },
    loginPost: async (req, res) => {
        res.redirect('/')
    }
}