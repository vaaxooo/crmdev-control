const Router = require('koa-router');
const router = new Router();

const {
    createTransaction
} = require('../controllers/TransactionController');


router.post('/', createTransaction);

module.exports.Transaction = router;