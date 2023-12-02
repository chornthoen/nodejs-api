const userService = require('../services/userService')
const pool = require('../config/dbConfig')

const getAllUsers = (req, res) => {
    try {
        pool.query(userService.getAllUsers, (err, result) => {
            if (err) throw err;
            if (result.rows.length === 0) {
                return res.status(404).json({success: false, message: 'No data found'});

            }
            res.status(200).json({
                success: true,
                message: 'successfully',
                data: result.rows
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(userService.getUserById, [id], (err, result) => {
        if (err) throw err
        if (result.rows.length === 0) {
            res.status(404).json({success: false, message: 'Not found user'})
        }
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: result.rows,
        })
    })
}

const createUser = (req, res) => {
    const {name, phone} = req.body;
    pool.query(userService.createUser, [name, phone], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            success: true,
            message: 'Created user successfully!',
            data: result.rows,
        })
    })
}
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, phone} = req.body;
    pool.query(userService.updateUser, [id, name, phone], (err, result) => {
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
            data: result.rows
        })
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(userService.deleteUser, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Not found user',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Deleted user successfully!!'
        })
    })
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}