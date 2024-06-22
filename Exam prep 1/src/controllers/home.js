const { getRecent } = require("../services/stone")

module.exports = {
    home: async (req, res) => {

        const stones = await getRecent();
        console.log(stones)
        res.render('home', { stones })
    }
}