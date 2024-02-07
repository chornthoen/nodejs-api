
const getAllEmployees = 'SELECT * FROM employee'
const getEmployeeById = 'SELECT * FROM employee WHERE id = $1'
const createEmployee = 'INSERT INTO employee(firstname,lastname,email,jobtitle,department) VALUES ($1,$2,$3,$4,$5) RETURNING *'

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee
}