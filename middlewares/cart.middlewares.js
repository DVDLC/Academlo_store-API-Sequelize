// Utils
const { ApiError } = require("../utils/app-error-handler");
const { HttpStatusCode } = require("../utils/http-statusCode");
const { catchAsync } = require("../utils/try-catch.utils");
// Models
const { ProductInCart } = require("../models/productInCart.model");
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");

const verifyIfProductNotExceedQuantity = ( req, res, next ) => {

    const { product } = req
    const { quantity } = req.body

    if( quantity > product.quantity ){ return next( new ApiError( 
        HttpStatusCode.BAD_REQUEST, 
        'You cannot exceed the available quantity' )
    )} else if( quantity <= 0 ){
        return next( new ApiError( 
            HttpStatusCode.BAD_REQUEST, 
            'You cannot put negative values' )
    )}

    next()
}

const verifyCartParams = ( req, res, next ) => {
    const { productId, quantity } = req.body

    if( !productId && productId.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'product is required' ) )
    } else if( !quantity && quantity.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'quantity is required' ) )
    }

    if( isNaN( productId ) || productId <= 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'productId incorrect format' ) )
    } else if( isNaN( quantity ) ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'quantity incorrect format' ) )
    }

    next()
}

const productInCartExist = catchAsync(async( req, res, next ) => {

    const { sessionUser } = req

    const { productId } = req.body
    const { id } = req.params
    let product
    let productInCart

    // Verify if the user have an active cart
    const cart = await Cart.findOne({ 
        where: { userId: sessionUser.id, status: 'active' }
    })

    if( !cart ) return next( new ApiError( 
        HttpStatusCode.BAD_REQUEST, 
        'Your cart is empty' 
    ))

    // Check if the productInCart exist 
    if( productId ){
        [ productInCart, product ] = await Promise.all([
            ProductInCart.findOne({ 
                where: { productId, cartId: cart.id, status: 'active' } 
            } ),
            Product.findOne({
                where: { id: productId, status: 'active' }
            })
        ])
    } else if( id ){
        [ productInCart, product ] = await Promise.all([
            ProductInCart.findOne({ 
                where: { productId: id, cartId: cart.id, status: 'active' } 
            } ),
            Product.findOne({
                where: { id, status: 'active' }
            })
        ])
    }

    if( !productInCart || !product ) return next( new ApiError( 
        HttpStatusCode.BAD_REQUEST, 
        'The product you are looking for does not exist in the cart' 
    ))
    
    // Send the product in the cart 

    req.productInCart = productInCart
    req.product = product
    next()
})


const productAlreadyExistInCart = catchAsync( async( req, res, next ) => {

    const { productId } = req.body
    
    const product = await Product.findOne({
            where: { id: productId, status: 'active' }
    })

    if( !product ) return next( new ApiError( 
        HttpStatusCode.BAD_REQUEST,  'That product you are looking for does not exist'
    ))

    req.product = product
    next()
})

const verifyCartExist = catchAsync( async( req, res, next ) => {

    const { sessionUser } = req
    const queryCart = { userId: sessionUser.id, status: 'active' }

    const cart = await Cart.findOne({ where: queryCart })

    if( !cart ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'Your cart is empty' ))
    next()
})

module.exports = {
    verifyCartParams,
    productInCartExist,
    verifyIfProductNotExceedQuantity,
    productAlreadyExistInCart,
    verifyCartExist
}