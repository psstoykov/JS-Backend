const { CatalogRouter } = require("../controllers/catalog");
const { home } = require("../controllers/home")
const { userRouter } = require('../controllers/user');
const { volcanoRouter } = require("../controllers/volcano");
const { session } = require('../middlewares/session');


function configRoutes(app) {
    //TODO attach the specific routes from your app
    //example app.get('/', callback) or import an outside partial router as app.use(partialRouter)

    app.get('/', home)
    app.use(userRouter);
    app.use(volcanoRouter);
    app.use(CatalogRouter);
};

module.exports = { configRoutes }