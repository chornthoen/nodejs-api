const userService = require('../services/userService')
const pool = require('../config/dbConfig')

const getAllUsers = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let resultUser, totalElements, totalPages, prevPage, nextPage;

    pool.query(userService.getAllUsers, (err, result) => {

        if (page && limit) {
            const start = (page - 1) * limit;
            const end = page * limit;
             resultUser = result.rows.slice(start, end)
             totalElements = result.rows.length;
             totalPages = Math.ceil(totalElements / limit);
             prevPage = page > 1 ? page - 1 : null;
             nextPage = page < totalPages ? page + 1 : null;

        } else {
            resultUser = result.rows;
            totalElements = result.rows.length;
            totalPages = 1;
            prevPage = null;
            nextPage = null;
        }
        const response = {
            success: true,
            message: 'Successfully',
            data: resultUser,
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
            return res.status(404).json({
                success: false, message: 'No data found'
            });

        }
        res.status(200).json(response);
    });
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(userService.getUserById, [id], (err, result) => {
        if (err) throw err
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Not found user'
            })
        }
        res.status(200).json({
            success: 200,
            message: 'Successfully',
            data: result.rows[0],
        })

    })
}
const createUser = (req, res) => {
    const { username, phone } = req.body;
    pool.query(userService.createUser, [username, phone], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            success: true,
            message: 'Created user successfully!',
            data: {
                name: result.rows[0].username,
                phone: result.rows[0].phone,
            }
        })
    })
}
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { username, phone } = req.body;
    pool.query(userService.updateUser, [id, username, phone], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Not found user'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Updated user successfully!',
            data: {
                name: result.rows[0].name,
                phone: result.rows[0].phone,
            }
        })
    })
}
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(userService.deleteUser, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false, message: 'Not found user',
            })
        }
        res.status(200).json({
            success: true, message: 'Deleted user successfully!!'
        })
    })
}


module.exports = {
    getAllUsers, getUserById, createUser, updateUser, deleteUser,
}