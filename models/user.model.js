const { db, DataTypes } = require("../db/db.config");

const User = db.define( 'user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName: { 
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    role: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: { 
                args: [[ 'admin', 'user', 'sales' ]]
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [[ 'active', 'disabled' ]]
            } 
        }
    }
})

module.exports = {
    User
}