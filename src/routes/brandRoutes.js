const {Router} = require('express');
const mainController = require('../controllers/brandController');

const router = Router();

router.get('/', mainController.getAllBrands);
router.get('/:id', mainController.getBrandById);
router.post('/', mainController.createBrand);
router.put('/:id', mainController.updateBrand);
router.delete('/:id', mainController.deleteBrand);


module.exports = router;
