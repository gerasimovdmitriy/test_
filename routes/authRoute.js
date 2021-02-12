const router = require('express').Router();
const controller = require('../controllers/authController')
const session = require('../middleware/session')

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/logout',session.checkSession, controller.logout);
router.put('/refreshPassword',session.checkSession, controller.refreshPassword);

module.exports = router;