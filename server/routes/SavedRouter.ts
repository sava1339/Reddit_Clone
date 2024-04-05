const Router = require('express');
const router = new Router();
const SavedController = require('../controllers/SavedController');

router.post('/',SavedController.create);
router.delete('/:id',SavedController.delete);
router.get('/:userId',SavedController.findByUser);

module.exports = router;
export{}