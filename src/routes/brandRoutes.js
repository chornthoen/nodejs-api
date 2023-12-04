const {Router} = require('express');
const brandController = require('../controllers/brandController');

const router = Router();

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.post('/', brandController.createBrand);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);
router.get('/search/:name', brandController.searchBrand);


module.exports = router;
