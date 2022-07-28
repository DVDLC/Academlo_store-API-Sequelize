// Libraries
const { Router } = require("express");
// Controllers
const { 
    addProductToCart, 
    updateCart, 
    deleteProductInCart, 
    purchaseCart 
} = require("../controllers/cart.controllers");
// Middlewares
const { verifyIfProductNotExceedQuantity, verifyCartParams, productInCartExist, productAlreadyExistInCart, verifyCartExist } = require("../middlewares/cart.middlewares");
const { protectSession } = require("../middlewares/jwt.middlewares");
const { productExistByID } = require("../middlewares/products.middlewares");

const routes = Router()

routes.use( protectSession )

routes.post( '/add-product', [ 
    verifyCartParams,
    productAlreadyExistInCart,
    verifyIfProductNotExceedQuantity
], addProductToCart )

routes.patch( '/update-cart', [
    productInCartExist,
    verifyIfProductNotExceedQuantity
], updateCart )

routes.delete( '/:id', [
    productInCartExist
], deleteProductInCart )

routes.post( '/purchase', [
    verifyCartExist
], purchaseCart )

module.exports = routes