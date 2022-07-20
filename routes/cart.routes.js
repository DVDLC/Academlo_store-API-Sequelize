const { Router } = require("express");
const { 
    addProductToCart, 
    updateCart, 
    deleteProductInCart, 
    purchaseCart 
} = require("../controllers/cart.controllers");

const routes = Router()

routes.post( '/add-product', addProductToCart )

routes.patch( '/update-cart', updateCart )

routes.delete( '/:productId', deleteProductInCart )

routes.post( '/purchase', purchaseCart )

module.exports = routes