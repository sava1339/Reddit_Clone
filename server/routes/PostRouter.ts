const Router = require('express');
const router = new Router();
const PostController = require('../controllers/PostController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckOwnerMiddleware = require('../middleware/CheckOwnerMiddleware');

router.post('/',PostController.create);
router.delete('/del/:id',AuthMiddleware,CheckOwnerMiddleware,PostController.delete);
router.get('/:communityId',PostController.findAll);

module.exports = router;
export{}