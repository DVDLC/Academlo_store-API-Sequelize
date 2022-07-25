// Modles
const { Category } = require("../models/category.model")
// Utils
const { ApiError } = require("../utils/app-error-handler")
const { HttpStatusCode } = require("../utils/http-statusCode")
const { catchAsync } = require("../utils/try-catch.utils")


const categoryIsAlreadyExist = catchAsync( async( req, res, next ) => {

    const { name } = req.body
    const { id } = req.params
    let categoryExist

    if( name ){
        categoryExist = await Category.findOne({ where: { name } })
        if( categoryExist ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, `${ name } is already exist` ) )
    }
    if( id ){
        categoryExist = await Category.findOne({ where: { id } })
        if( !categoryExist ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, `Nothing updated` ) )

        req.category = categoryExist
    }

    next()
})

const verifyParams = ( req, res, next) => {

    const { name } = req.body
    if( name.length === 0 ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'name is required' ) )

    next()
}

const verifyIfCategoryExistInPC = catchAsync(async( req, res, next ) => {
    const { categoryId } = req.body

    const categoryExist = await Category.findOne({ where: { id: categoryId } })
    if( !categoryExist ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, `This category does not exist` ) )


    next()
})

module.exports = { 
    categoryIsAlreadyExist,
    verifyParams,
    verifyIfCategoryExistInPC
}