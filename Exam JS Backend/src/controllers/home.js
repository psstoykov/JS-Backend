const { getRecent } = require('../services/recipe')

module.exports = {
    home: async (req, res) => {

        const recipes = await getRecent();
        res.render('home', { recipes });
    }
}