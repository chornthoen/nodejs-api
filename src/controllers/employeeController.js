
const employeeService = require('../services/employeeService');
const pool = require('../config/dbConfig');

const getAllEmployees = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let resultEmployee, totalElements, totalPages, prevPage, nextPage;

    pool.query(employeeService.getAllEmployees, (err, result) => {
        if (page && limit) {
            const start = (page - 1) * limit;
            const end = page * limit;
            resultEmployee = result.rows.slice(start, end);
            totalElements = result.rows.length;
            totalPages = Math.ceil(totalElements / limit);
            prevPage = page > 1 ? page - 1 : null;
            nextPage = page < totalPages ? page + 1 : null;
        } else {
            resultEmployee = result.rows;
            totalElements = result.rows.length;
            totalPages = 1;
            prevPage = null;
            nextPage = null;
        }

        const response = {
            success: true,
            message: 'Successfully',
            data: resultEmployee,
            pagination: {
                totalElements: totalElements,
                totalPages: totalPages,
                prevPage: prevPage,
                nextPage: nextPage,
                currentPage: page,
            }
        }

        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No data found',
            });
        }
        res.status(200).json(response);
    });
}

//get employee by id
const getEmployeeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(employeeService.getEmployeeById, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: 200,
                message: 'No data found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: result.rows[0],
        });
    });
}
//create employee
const createEmployee = (req, res) => {
    const { firstname, lastname, email, jobtitle, department } = req.body;
    pool.query(employeeService.createEmployee, [firstname, lastname, email, jobtitle, department], (err, result) => {
        if (err) throw err;
        res.status(201).json({
            success: true,
            message: 'Employee added successfully',
            data: {
                firstname,
                lastname,
                email,
                jobtitle,
                department,
            }
        });
    });
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee
}
