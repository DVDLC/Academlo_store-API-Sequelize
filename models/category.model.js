const { db, DataTypes } = require("../db/db.config");

const Category = db.define( 'category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate:{
            isIn: {
                args: [[ 'active', 'disabled' ]]
            }
        }
    }
})

module.exports = {
    Category
}