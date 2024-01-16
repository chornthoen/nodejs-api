const { Router } = require('express');
const brandController = require('../controllers/brandController');

const router = Router();

router.route('/')
    .get(brandController.getAllBrands)
    .post(brandController.createBrand);

router.route('/:id')
    .get(brandController.getBrandById)
    .put(brandController.updateBrand)
    .delete(brandController.deleteBrand);

router.route('/search/:name')
    .get(brandController.searchBrand);

module.exports = router;