const { Model, DataTypes } = require('sequelize');
const { MySQLi } = require('../modules/MySQLi');

class Notification extends Model {}

Notification.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: MySQLi,
    modelName: 'notifications',
    freezeTableName: true
});

module.exports.Notification = Notification;