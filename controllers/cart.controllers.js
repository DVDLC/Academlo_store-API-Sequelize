const { response } = require("express");
const { catchAsync } = require("../utils/try-catch.utils");

const addProductToCart = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'POST - add product to cart'
    })
})

const updateCart = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'PATCH - update cart'
    })
})

const deleteProductInCart = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'DELETE - delete product in cart'
    })
})

const purchaseCart = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'POST - purchase cart'
    })
})

module.exports = {
    addProductToCart,
    updateCart,
    deleteProductInCart,
    purchaseCart
}