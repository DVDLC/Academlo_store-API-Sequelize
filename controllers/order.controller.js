// Libraries
const { response } = require("express") 
// Models
const { Product } = require("../models/product.model")
const { Order } = require("../models/order.model")
// Utils
const { catchAsync } = require("../utils/try-catch.utils")


const getUserProductsForSale = catchAsync( async( req, res = response, next ) => {

    const { sessionUser } = req
    const query = { userId: sessionUser.id }

    const [ total, products ] = await Promise.all([
        Product.count({ where: query }),
        Product.findAll({ 
            where: query,
            attributes: [ 'id', 'title', 'quantity', 'price', 'status' ] 
        })
    ])

    res.status( 200 ).json({
        total,
        products
    })
})

const getAllOrders = catchAsync( async( req, res = response, next ) => {

    const { sessionUser } = req
    const query = { userId: sessionUser.id }

    const [ total, orders ] = await Promise.all([
        Order.count({ where: query }),
        Order.findAll({ 
            where: query,
            attributes: [ 'id', 'userId', 'cartId', 'totalPrice', 'status' ] 
        })
    ])

    res.status( 200 ).json({
        total,
        orders 
    })
})

const getOrderByID = catchAsync(( req, res = response, next ) => {

    const { order } = req

    res.status( 200 ).json({
        order
    })
})

module.exports = {
    getUserProductsForSale,
    getAllOrders,
    getOrderByID
}