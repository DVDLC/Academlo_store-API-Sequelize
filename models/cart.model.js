const { db, DataTypes } = require("../db/db.config");

const Cart = db.define( 'cart', {
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
    status:{
        type: DataTypes.STRING(6),
        allowNull: false,
        defaultValue: 'empty',
        validate:{
            isIn: [[ 'active', 'empty', 'done' ]]
        }
    }
})

module.exports = {
    Cart
}

