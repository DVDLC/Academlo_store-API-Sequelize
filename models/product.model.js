const { db, DataTypes } = require("../db/db.config");

const Product = db.define( 'product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: { 
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [[ 'active', 'outofstock', 'inactive' ]]
        }
    }
})

module.exports = {
    Product
}