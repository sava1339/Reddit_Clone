const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/signin',UserController.registration);
router.post('/login',UserController.login);
router.get('/auth',AuthMiddleware,UserController.auth)

module.exports = router;
export{}