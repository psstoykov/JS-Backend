const { getAllStones, getStoneById } = require("../services/stones")

module.exports = {
    dashboard: async (req, res) => {
        //TODO  finish creating the dashboard function
        const stones = await getAllStones();


        for (const stone of stones) {
            stone.isAuthor = req.user && req.user._id == stone.owner.toString();
        }

        res.render('dashboard', { stones })
    },
    details: async (req, res) => {
        const id = req.params.id;
        const stone = await getStoneById(id);
        console.log(req)

        if (!stone) {
            res.render('404')
        }
        stone.isAuthor = req.user && req.user._id == stone.owner.toString();
        res.render('details', { stone });

    }
}