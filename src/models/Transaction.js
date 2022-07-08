const { Model, DataTypes } = require('sequelize');
const { MySQLi } = require('../modules/MySQLi');

class Transaction extends Model {}

Transaction.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    office_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    wallet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: MySQLi,
    modelName: 'transactions',
    freezeTableName: true
});

module.exports.Transaction = Transaction;