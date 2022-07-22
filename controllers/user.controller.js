// Libraries
const { response } = require("express") 
// Models

// Utils
const { ApiError } = require( "../utils/app-error-handler" )
const { HttpStatusCode } = require("../utils/http-statusCode")
const { catchAsync } = require("../utils/try-catch.utils")

// Development controller
const getAllActiveUsers = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        status: 'GET - development controller'
    })
})

const updateUserInfo = catchAsync(( req, res, next ) => {
    res.status( 200 ).json({
        ok: true,
        status: 'PATCH - update user info'
    })
})

const DeleteUser = catchAsync(( req, res, next ) => {
    res.status( 200 ).json({
        ok: true,
        status: 'DELETE - delete user'
    })
})

module.exports = {
    getAllActiveUsers,
    updateUserInfo,
    DeleteUser
}

