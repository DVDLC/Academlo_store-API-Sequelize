// Libraries
const { response } = require("express") 
// Models
// Utils
const { catchAsync } = require("../utils/try-catch.utils")


/* 
    TODO:
        · verify if the user role is "sales" and active  
*/

const getUserProductsForSale = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        status: 'GET - user products for sale'
    })
})

/* 
    TODO:
        · verify if the user is active  
*/

const getAllOrders = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        status: 'GET - All orders'
    })
})

const getOrderByID = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        status: 'GET - order by ID'
    })
})

module.exports = {
    getUserProductsForSale,
    getAllOrders,
    getOrderByID
}