const { db, DataTypes } = require("../db/db.config");

const ProductInCart = db.define( 'productInCart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cartId: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [[ 'active', 'cancelled' ]]
        }
    }
})

module.exports = {
    ProductInCart
}