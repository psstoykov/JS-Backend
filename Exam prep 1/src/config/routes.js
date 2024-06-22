const { CatalogRouter, catalogRouter } = require("../controllers/catalog");
const { home } = require("../controllers/home");
const { stoneRouter } = require("../controllers/stone");

const { userRouter } = require('../controllers/user');
const { session } = require('../middlewares/session');


function configRoutes(app) {
    //TODO attach the specific routes to the app with app.get or app.use(external router from controller)

    app.get('/', home)
    app.use(userRouter);
    app.use(stoneRouter);
    app.use(catalogRouter)


    app.get('*', (req, res) => {
        res.render('404')
    })
};

module.exports = { configRoutes }