const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Ship = sequalize.define('ship', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3,200]
        }
    },
    displacement: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Ship;
