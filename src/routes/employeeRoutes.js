
const {Router} = require('express');
const employeeController = require('../controllers/employeeController');

const router = Router();

router.route('/')
    .get(employeeController.getAllEmployees)

module.exports = router;