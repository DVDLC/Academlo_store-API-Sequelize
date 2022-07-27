// Libraries
const { response } = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Models
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
// Utils
const { catchAsync } = require("../utils/try-catch.utils");


const signin =  catchAsync(async( req, res = response, next ) => {

    let { password, ...props } = req.body
    let newCart

    const salt = bcrypt.genSaltSync( 10 )
    password = bcrypt.hashSync( password, salt )

    const newUser = await User.build({ ...props, password })
    await newUser.save() 

    newUser.password = undefined

    res.status( 200 ).json({
        newUser
    })
})

const login = catchAsync( async( req, res = response, next ) => {

    const user = req.userLogin
    const payload = { id: user.id }

    const token = jwt.sign( 
        payload, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '12h' } 
    )

    res.status( 200 ).json({
        userlogin: {
            username: user.userName,
            email: user.email
        },
        token
    })
})

module.exports = {
    signin,
    login
}