
const employeeService = require('../services/employeeService');
const pool = require('../config/dbConfig');

const getAllEmployees = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = (page - 1) * limit;
    const end = page * limit;
    pool.query(employeeService.getAllEmployees, (err, result) => {
        const resultEmployee = result.rows.slice(start, end);
        const totalElements = result.rows.length;
        const totalPages = Math.ceil(totalElements / limit);
        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;
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
                success: true,
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

module.exports = {
    getAllEmployees,
    getEmployeeById,
}
