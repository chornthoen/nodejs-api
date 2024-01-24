const pool = require('../config/dbConfig');

const createUserTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE,
            phone VARCHAR(15)
        );
    `;

    try {
        await pool.query(createTableQuery);
    } catch (err) {
        console.error("An error occurred while creating the User table", err);
    }
}

module.exports = createUserTable;