module.exports = {

    createCastGet: (req, res) => {
        res.render('cast-create');
    },
    createCastPost: async (req, res) => {

        console.log(req.body);
        res.end();
    }
}