const Router = require('express');
const router = new Router();
const ChatMessageController = require('../controllers/ChatMessageController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckOwnerMiddleware = require('../middleware/CheckOwnerMiddleware');

router.post('/',ChatMessageController.create);
router.delete('/del/:id',AuthMiddleware,CheckOwnerMiddleware,ChatMessageController.delete);
router.get('/:chatGroupId',ChatMessageController.findAll);

module.exports = router;
export{}