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
const { verifyIfProductNotExceedQuantity, verifyCartParams, productInCartExist, productAlreadyExistInCart } = require("../middlewares/cart.middlewares");
const { protectSession } = require("../middlewares/jwt.middlewares");
const { productExistByID } = require("../middlewares/products.middlewares");

const routes = Router()

routes.use( protectSession )

routes.post( '/add-product', [ 
    verifyCartParams,
    productAlreadyExistInCart,
    verifyIfProductNotExceedQuantity
], addProductToCart )

/*
    TODO: 
        De alguna forma recibir el cartId por sessionUser
        una vez lo recibimos verificamos que exista el product in cart
        y lo enviamos en la req para que el controlador se haga cargo de actualizarlo
*/

routes.patch( '/update-cart', [
    productInCartExist,
    verifyIfProductNotExceedQuantity
], updateCart )

routes.delete( '/:id', [
    productInCartExist
], deleteProductInCart )

routes.post( '/purchase', purchaseCart )

module.exports = routes