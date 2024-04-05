const Router = require('express');
const router = new Router();
const CommentController = require('../controllers/CommentController');

router.post('/',CommentController.create);
router.delete('/:id',CommentController.delete);
router.get('/',CommentController.findAll);

module.exports = router;
export{}