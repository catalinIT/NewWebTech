const { Sequelize } = require('sequelize');

//Comenteaza asta pt heroku
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './sqlite/database.db'
// });



const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})


module.exports = sequelize;