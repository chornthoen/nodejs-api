const productService = require('../services/productService');
const pool = require('../config/dbConfig');

const getAllProducts = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = (page - 1) * limit;
    const end = page * limit;


    pool.query(productService.getAllProducts, (err, result) => {
        const resultProduct = result.rows.slice(start, end);
        const totalElements = result.rows.length;
        const totalPages = Math.ceil(totalElements / limit);
        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;

        const response = {
            success: true,
            message: 'Successfully',
            data: resultProduct,
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

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(productService.getProductById, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Not found product'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: result.rows[0],
        })
    })
}

const createProduct = (req, res) => {
    const { name, description, price, quantity } = req.body;
    pool.query(productService.createProduct, [name, description, price, quantity], (err, result) => {
        if (err) throw err;
        res.status(200).json({
            success: true,
            message: 'Created product successfully!',
            data: result.rows[0],
        })
    })
}

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, quantity } = req.body;
    pool.query(productService.updateProduct, [id, name, description, price, quantity], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Not found product'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Updated product successfully!',
            data: result.rows[0],
        })
    })
}

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(productService.deleteProduct, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false, message: 'Not found product',
            })
        }
        res.status(200).json({
            success: true, message: 'Deleted product successfully!!'
        })
    })
}

module.exports = {
    getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
}