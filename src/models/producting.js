const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfigs");
const Producing = sequelize.define(
    "pricing",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        }
    }
);
const createProducingTable = async () => {
    try {
        await Producing.sync();
        return 'Pricing table created successfully.';
    } catch (error) {
        return `Error creating Producing table: ${error.message}`;
    }
};

module.exports = Producing;
module.exports = createProducingTable;

