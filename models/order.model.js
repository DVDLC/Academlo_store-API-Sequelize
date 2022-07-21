const { db, DataTypes } = require("../db/db.config");

const order = db.define( 'order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    status:{
        type: DataTypes.STRING(9),
        allowNull: false,
        defaultValue: 'active',
        validate:{
            isIn: [[ 'active', 'cancelled', 'paidout' ]]
        }
    }
})

module.exports = {
    order
}
