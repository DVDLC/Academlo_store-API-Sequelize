const { ApiError } = require('./app-error-handler')
const { HttpStatusCode } = require('./http-statusCode')

require('dotenv').config()

const globalErrorHandler = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'   
    
    const sendErrorDev = ( err, req, next ) => {
        res.status( err.statusCode ).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        })
    }
    
    const sendErrorProd = ( err, req, next ) => {
        res.status( err.statusCode ).json({
            status: err.status,
            error: err
        })
    }
    
    const handlerSQvalidationErrRole = () => {
        return new ApiError( HttpStatusCode.BAD_REQUEST, 'Must be a valid role' )
    }

    const handlerSQvalidationErrStatus = () => {
        return new ApiError( HttpStatusCode.BAD_REQUEST, 'Must be a valid status' )
    }

    const handlerUniqueError = () => {
        return new ApiError( HttpStatusCode.BAD_REQUEST, 'the email already exist' )
    }
    
    const handleJWTInvalid = () => {
        return new ApiError( HttpStatusCode.BAD_REQUEST, 'Invalid token' )
    }

    if( process.env.NODE_ENV === 'development' ) {
        sendErrorDev( err, req, next )
        
    }if( process.env.NODE_ENV === 'production' ){
        
        let error = { ...err }
        // Sequelize validation error
        const [ errorItem ] = ( error.errors )

        console.log( error )

        if( errorItem.type === 'Validation error' && errorItem.path === 'role' ){
            error = handlerSQvalidationErrRole()
        }else if( errorItem.type === 'Validation error' && errorItem.path === 'status' ){
            error = handlerSQvalidationErrStatus()
        }else if( error.name === 'SequelizeUniqueConstraintError' ){
            error = handlerUniqueError()
        }else if( error.message === 'invalid signature' ){
            error = handleJWTInvalid()
        }

        sendErrorProd( error, req, next ) 
    }
}

module.exports = {
    globalErrorHandler
}