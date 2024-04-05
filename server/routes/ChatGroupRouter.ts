const Router = require('express');
const router = new Router();
const ChatGroupController = require('../controllers/ChatGroupController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const ChatGroupMiddleware = require('../middleware/ChatGroupMiddleware');

router.post('/',ChatGroupController.create);
router.delete('/del/:id',AuthMiddleware,ChatGroupMiddleware,ChatGroupController.delete);
router.get('/:id',ChatGroupController.findOne);

module.exports = router;
export{}