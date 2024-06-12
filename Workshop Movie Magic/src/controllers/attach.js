const { getMovieById, attachCastToMovie } = require("../services/movie");
const { getAllCast } = require('../services/cast')

module.exports = {
    attachGet: async (req, res) => {

        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        const allCast = await getAllCast();
        console.log(allCast)
        res.render('cast-attach', { movie, allCast })
    },
    attachPost: async (req, res) => {

        const movieId = req.params.id;
        const castId = req.body.cast;

        if (!movieId || !castId) {
            res.status(400).end();
            return;
        }


        if (castId == 'none') {
            const movie = await getMovieById(movieId);
            const allCast = await getAllCast();
            console.log
            res.render('cast-attach', { movie, allCast, error: true });

            return;
        }

        await attachCastToMovie(movieId, castId);

        res.redirect('/details/' + movieId)
    }
}