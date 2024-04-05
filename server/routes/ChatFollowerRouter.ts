const Router = require('express');
const router = new Router();
const ChatFollowerController = require('../controllers/ChatFollowerController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckOwnerMiddleware = require('../middleware/CheckOwnerMiddleware');

router.post('/',ChatFollowerController.create);
router.delete('/del/:id',AuthMiddleware,CheckOwnerMiddleware,ChatFollowerController.delete);
router.get('/:userId',ChatFollowerController.findAll);

module.exports = router;
export{}