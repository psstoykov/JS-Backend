const { createCast, getAllCast } = require('../services/cast')

module.exports = {

    createCastGet: (req, res) => {
        res.render('cast-create');
    },
    createCastPost: async (req, res) => {

        const errors = {
            name: !req.body.name,
            age: !req.body.age,
            born: !req.body.born,
            nameInMovie: !req.body.nameInMovie,
            imageUrl: !req.body.imageUrl
        }

        if (Object.values(errors).includes(true)) {
            res.render('cast-create', { cast: req.body, errors })
        }
        const result = await createCast(req.body);
        res.redirect('/');
    }
}