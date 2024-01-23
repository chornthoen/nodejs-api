
const pool = require('../config/dbConfig');

const createEmployeeTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Employee (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(100),
            lastName VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            jobTitle VARCHAR(100),
            department VARCHAR(100)
        );
    `;

    try {
        await pool.query(createTableQuery);
    } catch (err) {
        console.error("An error occurred while creating the Employee table", err);
        
    }
}

module.exports = createEmployeeTable;
