module.exports = {
    home: (req, res) => {
        res.render('home')
    },
    details: (req, res) => {
        res.render('details')
    },
    search: (req, res) => {
        res.render('search');
    }
}