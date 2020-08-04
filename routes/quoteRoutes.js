let express = require('express');
let router = express.Router();

let controller = require('../controllers/quoteController.js');

router.get('/', controller.readAll);

router.get('/:id', controller.readOne);

router.delete('/:id', controller.del);

router.post('/', controller.insert);

router.put('/', controller.update);

module.exports = router;
