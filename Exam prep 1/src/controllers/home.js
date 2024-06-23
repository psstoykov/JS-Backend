const { getRecent } = require("../services/stone")

module.exports = {
    home: async (req, res) => {

        const stones = await getRecent();

        res.render('home', { stones })
    }
}