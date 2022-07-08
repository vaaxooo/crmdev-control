const { Sequelize } = require('sequelize');

const config = process.env;

module.exports.MySQLi = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    logging: false,
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci',
            useUTC: false,
            dateStrings: true,
            typeCast: true
        },
        timestamps: true
    }
});