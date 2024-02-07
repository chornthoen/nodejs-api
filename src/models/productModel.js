

const pool = require('../config/dbConfig');

const createProductsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10, 2)
        );
    `;

    try {
        await pool.query(createTableQuery);
    } catch (err) {
        console.error("An error occurred while creating the User table", err);
    }
}

module.exports = createProductsTable;