const brandService = require('../services/brandService');
const pool = require('../config/dbConfig');

const getAllBrands = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start = (page - 1) * limit;
    const end = page * limit;
    pool.query(brandService.getAllBrands, (err, result) => {
        const brandResult = result.rows.slice(start,end);
        const totalElement = result.rows.length;
        const totalPage = Math.ceil(totalElement/limit);
        const prevPage = page > 1 ? page -1 : null;
        const nextPage = page < totalPage ? page + 1 : null;
        const response = {
            success: true,
            message: 'Successfully!',
            data:brandResult,
            pagination: {
                totalElement : totalElement,
                totalPage : totalPage,
                prevPage: prevPage,
                nextPage:nextPage,
                currentPage: page
            }
        }
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }

        res.status(200).json(response);
    });
}
const getBrandById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(brandService.getBrandById, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'successfully',
            data: result.rows
        });
    });
}
const createBrand = (req, res) => {
    const {model, name} = req.body;
    pool.query(brandService.createBrand, [model, name], (err, result) => {
        if (err) throw err;
        res.status(201).json({
            success: true,
            message: 'successfully',
            data: result.rows
        });
    });
}

const updateBrand = (req, res) => {
    const id = parseInt(req.params.id);
    const {model, name} = req.body;
    pool.query(brandService.updateBrand, [id, model, name], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'successfully',
            data: result.rows
        });
    });
}
const deleteBrand = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(brandService.deleteBrand, [id], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'successfully'
        });
    });
}
const searchBrand = (req, res) => {
    const brandName = req.params.name;
    pool.query(brandService.searchBrand, ['%'+ brandName + '%'], (err, result) => {
        if (err) throw err;
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved brand',
            data: result.rows
        });
    });
}
module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    searchBrand,
};
