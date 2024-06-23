
const { catalogRouter } = require("../controllers/catalog");
const { home } = require("../controllers/home");
const { recipeRouter } = require("../controllers/recipes");

const { userRouter } = require('../controllers/user');
const { session } = require('../middlewares/session');


function configRoutes(app) {
    //TODO attach the specific routes to the app with app.get or app.use(external router from controllers)

    app.get('/', home)
    app.use(userRouter);
    app.use(recipeRouter);
    app.use(catalogRouter);
    app.get('*', (req, res) => {
        res.render('404')
    })
};

module.exports = { configRoutes }