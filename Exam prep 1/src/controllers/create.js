module.exports = {
    createGet: async (req, res) => {
        res.render('create')
        console.log('opening create window')
    },
    createPost: async (req, res) => {
        res.redirect('/');
    }
}