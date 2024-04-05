const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/TypeController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckOwnerMiddleware = require('../middleware/CheckOwnerMiddleware');

router.post('/',AuthMiddleware,CheckOwnerMiddleware,TypeController.create);
router.delete('/del/:id',AuthMiddleware,CheckOwnerMiddleware,TypeController.delete);
router.get('/:communityId',TypeController.findOne);


module.exports = router;
export{}