module.exports = {
    createGet: async (req, res) => {
        res.render('create')
    },
    createPost: async (req, res) => {

        res.redirect('/');
    }
}