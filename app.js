require('dotenv-flow').config();
const config = process.env;

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const { MySQLi } = require('./src/modules/MySQLi');

const { Office } = require('./src/routes/Office');
const { Transaction } = require('./src/routes/Transaction');
const { Notification } = require('./src/routes/Notification');

/**
 * USED ROUTES
 */
router.use('/offices', Office.routes());
router.use('/transactions', Transaction.routes());
router.use('/notifications', Notification.routes());

app.listen(config.APP_PORT, async() => {
    await MySQLi.sync();
    console.log(`Server running on http://${config.APP_HOST}:${config.APP_PORT}`);
});