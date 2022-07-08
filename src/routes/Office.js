const Router = require('koa-router');
const router = new Router();

const {
    getAllOffices,
    getOfficeById,
    getOfficeByAddress,
    createOffice,
    updateOffice,
    deleteOffice,
    updateOfficeExpiresIn,
    checkOfficeExpiration,
    updateExpiresDateOffices,
    deleteOffices
} = require('../controllers/OfficeController');

const { getTransactions } = require('../controllers/TransactionController');


router.get('/all', getAllOffices);
router.get('/:id', getOfficeById);
router.get('/address/:address', getOfficeByAddress);
router.post('/', createOffice);
router.put('/:id', updateOffice);
router.delete('/:id', deleteOffice);
router.put('/expires/:id', updateOfficeExpiresIn);

router.post('/update-expires-date', updateExpiresDateOffices);
router.post('/delete', deleteOffices);

router.get('/check/:address', checkOfficeExpiration);

router.get('/:id/transactions', getTransactions);

module.exports.Office = router;