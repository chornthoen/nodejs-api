const brandService = require('../services/brandService');
const pool = require('../config/dbConfig');

const getAllBrands = (req, res) => {
    try {
        pool.query(brandService.getAllBrands, (err, result) => {
            if (err) throw err;
            if (result.rows.length === 0) {
                return res.status(404).json({success: false, message: 'No data found'});
            }
            res.status(200).json({success: true, message: 'successfully', data: result.rows});
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
const getBrandById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(brandService.getBrandById, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({success: false, message: 'No data found'});
        }
        res.status(200).json({success: true, message: 'successfully', data: result.rows});
    });
}
const createBrand = (req, res) => {
    const {model, name} = req.body;
    pool.query(brandService.createBrand, [model, name], (err, result) => {
        if (err) throw err;
        res.status(201).json({success: true, message: 'successfully', data: result.rows});
    });
}

const updateBrand = (req, res) => {
    const id = parseInt(req.params.id);
    const {model, name} = req.body;
    pool.query(brandService.updateBrand, [id, model, name], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({success: false, message: 'No data found'});
        }
        res.status(200).json({success: true, message: 'successfully', data: result.rows});
    });
}
const deleteBrand = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(brandService.deleteBrand, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({success: false, message: 'No data found'});
        }
        res.status(200).json({success: true, message: 'successfully'});
    });
}

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};
