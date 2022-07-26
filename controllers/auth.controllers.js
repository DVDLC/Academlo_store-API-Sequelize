// Libraries
const { response } = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Models
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
// Utils
const { catchAsync } = require("../utils/try-catch.utils");
const { Email } = require("../email/email.config");


const signin =  catchAsync(async( req, res = response, next ) => {

    let { password, ...props } = req.body

    const salt = bcrypt.genSaltSync( 10 )
    password = bcrypt.hashSync( password, salt )

    const newUser = await User.build({ ...props, password })
    await newUser.save() 

    newUser.password = undefined

    // Send a welcome Email to client
    if( newUser.role === 'user' || newUser.role === 'sales' ) {
        await new Email( newUser.email )
        .sendWelcome( newUser.userName )
    }

    res.status( 200 ).json({
        newUser
    })
})

const login = catchAsync( async( req, res = response, next ) => {

    const user = req.userLogin
    const payload = { id: user.id, email: user.email }

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