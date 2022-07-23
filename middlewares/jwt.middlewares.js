// libraries
const jwt = require( 'jsonwebtoken' )
const { ApiError } = require('../utils/app-error-handler')
const { HttpStatusCode } = require('../utils/http-statusCode')

const protectSession = ( req, res, next ) => {
    const { authorization } = req.headers

    // Verify if token exist
    if( !authorization ) return next( new ApiError( HttpStatusCode.UNAUTHORIZATE, 'Invalid token' ) )
    const token = authorization.split( " " )[1]

    // Verify if token is valid
    const decoded = jwt.verify( token, process.env.JWT_SECRET_KEY )
    req.sessionUser = decoded

    next()
}

const protectUserAccount = ( req, res, next ) => {
    const { id } = req.params
    const decodedUser = req.sessionUser
    
    if( decodedUser.id !== Number(id) ) return next( 
        new ApiError( HttpStatusCode.UNAUTHORIZATE, 'You are not the owner of this account' ) 
    )

    next()
}

module.exports = {
    protectSession,
    protectUserAccount
}