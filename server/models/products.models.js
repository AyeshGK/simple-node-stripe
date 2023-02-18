const sequelize = require('../database/dbConn')
const { DataTypes } = require('sequelize')


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priceInCents: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Product;