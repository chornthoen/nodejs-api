
const createProduct = 'INSERT INTO product (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
const getAllProducts = 'SELECT * FROM product';
const getProductById = 'SELECT * FROM product WHERE id = $1';
const updateProduct = 'UPDATE product SET name = $2, description = $3, price = $4, quantity = $5 WHERE id = $1 RETURNING *';
const deleteProduct = 'DELETE FROM product WHERE id = $1 RETURNING *';

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};