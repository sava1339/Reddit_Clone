const {Sequelize} = require('sequelize');
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host:'localhost',
        dialect:'mysql',
        port: +process.env.DB_PORT
    }
)