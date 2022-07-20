const { HttpStatusCode } = require('./http-statusCode')

require('dotenv').config()

const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'   

    if( process.env.NODE_ENV === 'development' ) {
        res.status( err.statusCode ).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        })
    }else if( process.env.NODE_ENV === 'production' ){
        res.status( err.statusCode ).json({
            status: err.status,
            error: err
        })
    }
}

module.exports = {
    globalErrorHandler
}