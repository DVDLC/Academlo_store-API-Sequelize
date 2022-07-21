const { db, DataTypes } = require("../db/db.config");

const ProductImg = db.define( 'productImg', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    imgUrl: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [[ 'active' ]]
        }
    }
})

module.exports = {
    ProductImg
}