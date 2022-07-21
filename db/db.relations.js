// Models
const { Cart } = require("../models/cart.model")
const { Category } = require("../models/category.model")
const { Order } = require("../models/order.model")
const { Product } = require("../models/product.model")
const { ProductImg } = require("../models/productImgs.model")
const { ProductInCart } = require("../models/productInCart.model")
const { User } = require("../models/user.model")

const dbRelations = () => {

    // User relations
    User.hasMany( Order, { foreignKey: 'userId' } )
    Order.belongsTo( User, { foreignKey: 'id' } )

    User.hasMany( Product, { foreignKey: 'userId' } )
    Product.belongsTo( User, { foreignKey: 'id' } )

    User.hasOne( Cart, { foreignKey: 'userId' } )
    Cart.belongsTo( User, { foreignKey: 'id' } )

    // Product relations
    Product.hasMany( ProductImg, { foreignKey: 'productId' } )
    ProductImg.belongsTo( Product, { foreignKey: 'id' } )

    Product.hasOne( ProductInCart, { foreignKey: 'productId' } )
    ProductInCart.belongsTo( Product, { foreignKey: 'id' } )

    Product.hasOne( Category, { foreignKey: 'productId' } )
    Category.belongsTo( Product, { foreignKey: 'id' } )

    // Cart relations
    Cart.hasOne( Order, { foreignKey: 'cartId' } )
    Order.belongsTo( Cart, { foreignKey: 'id' } )

    Cart.hasMany( ProductInCart, { foreignKey: 'cartId' } )
    ProductInCart.belongsTo( Cart, { foreignKey: 'id' } )
}

module.exports = {
    dbRelations
}