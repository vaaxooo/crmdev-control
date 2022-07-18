const Router = require('koa-router');
const router = new Router();

const {
    getNotificationsByDomain,
    createNotification,
    deleteNotification
} = require('../controllers/NotificationController');


router.get('/:domain/get', getNotificationsByDomain);
router.post('/create', createNotification);
router.delete('/delete', deleteNotification);

module.exports.Notification = router;