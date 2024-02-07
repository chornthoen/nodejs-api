
const {Router} = require('express');
const employeeController = require('../controllers/employeeController');

const router = Router();

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee)
router.route('/:id')
    .get(employeeController.getEmployeeById)

module.exports = router;