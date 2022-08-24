const { Model, DataTypes } = require('sequelize');
const { MySQLi } = require('../modules/MySQLi');

class Office extends Model {}

Office.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: true
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expires_in: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: MySQLi,
    modelName: 'offices',
    freezeTableName: true
});

module.exports.Office = Office;