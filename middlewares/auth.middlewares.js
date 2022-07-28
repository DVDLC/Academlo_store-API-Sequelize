// Libraries
const bcrypt = require('bcryptjs')
// Utils
const { catchAsync } = require("../utils/try-catch.utils");
const { ApiError } = require("../utils/app-error-handler");
// Models
const { User } = require("../models/user.model");
const { HttpStatusCode } = require("../utils/http-statusCode");

const userExists = catchAsync( async( req, res, next ) => {

    const { email, password } = req.body
    const query = { email, status: 'active' }

    const userSession = await User.findOne({ where: query })

    if( !userSession ) return next( new ApiError( HttpStatusCode.UNAUTHORIZATE, 'User not found' ) )

    // Verify password
    const ItisThePassword = bcrypt.compareSync( password, userSession.password )
    if( !ItisThePassword ) return next( new ApiError( HttpStatusCode.UNAUTHORIZATE, 'Incorrect password' ) )

    // Grant access
    req.userLogin = userSession
    next()
})

// TODO: TENGO un error por enviar mutiples next()

const emailValidation = ( req, res, next ) => {

    const regex = /\S+@\S+\.\S+/
    const { email } = req.body

    const isValidEmail = regex.test( email )

    if( !isValidEmail ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'Email is invalid' ) )

    next()
}

const validateSignInParams = ( req, res, next ) => {
    const { userName, email, password } = req.body

    if( !userName || userName.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'User name is required' ) )
    } else if( !email || email.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'Email is required' ) )
    }else if( !password || password.length === 0 ){
        return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'Password is required' ) )
    }else if( email.length > 0 ){
        return emailValidation( req, res, next )
    }

    next()
}

const validateEmailInDB = catchAsync(async(req, res, next) => {

    const { email } = req.body
    const query = { email, status: 'active' }

    const userAlreadyExist = await User.findOne({ where: query })

    if( userAlreadyExist ) return next( new ApiError( HttpStatusCode.BAD_REQUEST, 'The email is already exist' ) )
    next()
})


module.exports = {
    userExists,
    validateSignInParams,
    emailValidation,
    validateEmailInDB
}