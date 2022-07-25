// Models
const { Product } = require("../models/product.model");
// Utils
const { catchAsync } = require("../utils/try-catch.utils");
const { ApiError } = require("../utils/app-error-handler");
const { HttpStatusCode } = require("../utils/http-statusCode");


const userAlreadyPostProduct = catchAsync( async( req, res, next ) => {

    const { title } = req.body
    const sessionUser = req.sessionUser
    const query1 = { title, userId: sessionUser.id, status: 'active'  }
    const query2 = { title, userId: sessionUser.id, status: 'outofstock' }
    const query3 = { title, userId: sessionUser.id, status: 'inactive' }
    let msg

    const [ productActive, productOOS, productInactive ] = await Promise.all([
        Product.findOne({ where: query1 }),
        Product.findOne({ where: query2 }),
        Product.findOne({ where: query3 }),
    ])

    if( productOOS || productInactive ){
        msg = `You can update the status and quantity in: https://${ req.headers.host }/(productId/productName)` 
    }

    if( productActive ){
        return next( new ApiError( 
            HttpStatusCode.BAD_REQUEST, 
            `${ title }, is already exists an active` 
        ))
    } else if( productOOS ){
        return next( new ApiError( 
            HttpStatusCode.BAD_REQUEST, 
            `${ title }, is already exists but it is out of stock, ${ msg }` 
        ))
    } else if ( productInactive ){
        return next( new ApiError( 
            HttpStatusCode.BAD_REQUEST, 
            `${ title }, is already exists but is inactive, ${ msg }` 
        ))
    }
    

    next()
})

const verifyProductsParams = ( req, res, next ) => {

    const { title, description, quantity, price, categoryId } = req.body

    if( !title || title.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'title is required' ) )
    } else if( !description || description.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'description is required' ) )
    } else if( !quantity || quantity.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'quantity is required' ) )
    } else if( !price || price.length === 0 ) {
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'price is required' ) )
    } else if( !categoryId || categoryId.length === 0 ) {
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'categoryId is required' ) )
    } 

    if( isNaN( price ) ) {
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'price is not a number' ) )
    } else if( isNaN( quantity ) ) {
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'quantity is not a number' ) )
    } else if( isNaN( categoryId ) ) {
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'categoryId is not a number' ) )
    }

    next()
}

const productExistByID = catchAsync( async( req, res, next ) => {

    const { id } = req.params
    const query = { id, status: 'active' }

    const product = await Product.findOne({ where: query })

    if( !product ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'This product does not exist' ) )

    req.product = product
    next()
})

module.exports = {
    userAlreadyPostProduct,
    verifyProductsParams,
    productExistByID
}