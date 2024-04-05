const Router = require('express');
const router = new Router();
const FollowerController = require('../controllers/FollowerController');

router.post('/',FollowerController.create);
router.delete('/del/:id',FollowerController.delete);
router.get('/:userId',FollowerController.findByUser);

module.exports = router;
export{}