
const pool = require('../config/dbConfig');

const createProductTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10, 2)
        );
    `;

    try {
        await pool.query(createTableQuery);
    } catch (err) {
        console.error("An error occurred while creating the Product table", err);
    }
}

module.exports = createProductTable;