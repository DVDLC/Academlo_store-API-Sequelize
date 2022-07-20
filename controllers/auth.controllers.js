// Libraries
const { response } = require("express");
// Models
// Utils
const { catchAsync } = require("../utils/try-catch.utils");

const signin = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'POST - signin'
    })
})

const login = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'POST - login'
    })
})

module.exports = {
    signin,
    login
}