const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const CrewMember = sequalize.define('crewmember', {
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
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['CAPTAIN', 'SAILOR', 'VICE']
    },
    shipId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = CrewMember;
