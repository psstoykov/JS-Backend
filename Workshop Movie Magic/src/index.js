const express = require('express');
const { configHbs } = require('./config/hbs');
const { configExpress } = require('./config/express');
const { router } = require('./config/routes');

const PORT = process.env.PORT || 3000;
const app = express();

configHbs(app);
configExpress(app);
app.use(router);

app.listen(PORT);