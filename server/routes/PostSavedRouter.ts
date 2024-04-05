const Router = require('express');
const router = new Router();
const PostSavedController = require('../controllers/PostSavedController');

router.post('/',PostSavedController.create);
router.delete('/del/:savedId',PostSavedController.delete);
router.get('/:id',PostSavedController.findAll);


module.exports = router;
export{}