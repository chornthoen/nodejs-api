const getAllBrands = 'SELECT * FROM brand'
const getBrandById = 'SELECT * FROM brand WHERE id = $1'
const createBrand = 'INSERT INTO brand(model,name) VALUES ($1,$2) RETURNING *'
const updateBrand = 'UPDATE brand SET model = $2, name = $3 WHERE id = $1 RETURNING *'
const deleteBrand = 'DELETE FROM brand WHERE id = $1 RETURNING *'

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};
