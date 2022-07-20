// Libraries
const { response } = require("express");
// Models
// Utils
const { catchAsync } = require("../utils/try-catch.utils");

const getAllActiveProducts = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'GET - All active products'
    })
})

const getActiveProduct = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'GET - product by ID '
    })
})

const createProduct = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'POST - create product'
    })
})

const updateProduct = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'PATCH - update product'
    })
})

const deleteProduct = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'DELETE - delete product'
    })
})

module.exports = {
    getAllActiveProducts,
    getActiveProduct,
    createProduct,
    updateProduct,
    deleteProduct
}