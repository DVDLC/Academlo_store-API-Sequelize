const { User } = require("../models/user.model")
const { ApiError } = require("../utils/app-error-handler")
const { HttpStatusCode } = require("../utils/http-statusCode")
const { catchAsync } = require("../utils/try-catch.utils")

const verifyIfIsSalesRole = catchAsync( async ( req, res, next ) => {

    const { id } = req.sessionUser
    const query = { id, status: 'active', role: 'sales' }

    const isUserRoleSales = await User.findOne({ where: query })
    if( !isUserRoleSales ) return next( new ApiError( HttpStatusCode.UNAUTHORIZATE, 'You are not authorized to do this' ) )

    next()

})

const verifyParamsInUpdate = ( req, res, next ) => {
    const { userName, email } = req.body

    if( userName.length === 0 && email.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'There must be at least one value to update' ) )
    } 

    next()
}


module.exports = {
    verifyIfIsSalesRole,
    verifyParamsInUpdate
}