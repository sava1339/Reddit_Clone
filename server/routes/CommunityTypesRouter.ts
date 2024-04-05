const Router = require('express');
const router = new Router();
const CommunityTypesController = require('../controllers/CommunityTypesController');

router.post('/',CommunityTypesController.create);
router.delete('/del/:id',CommunityTypesController.delete);
router.get('/:communityId',CommunityTypesController.findOne);

module.exports = router;
export{}