const Router = require('express');
const router = new Router();
const CommunityController = require('../controllers/CommunityController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckOwnerMiddleware = require('../middleware/CheckOwnerMiddleware');

router.post('/',AuthMiddleware,CommunityController.create);
router.delete('/del/:id',AuthMiddleware,CheckOwnerMiddleware,CommunityController.delete);
router.get('/:id',CommunityController.findOne);
router.get('/',CommunityController.findAll);

module.exports = router;
export{}