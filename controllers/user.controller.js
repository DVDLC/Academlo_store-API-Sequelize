// Libraries
const { response } = require("express") 
// Models
const { User } = require("../models/user.model")
// Utils
const { catchAsync } = require("../utils/try-catch.utils")

// Development controller
const getAllActiveUsers = catchAsync(async( req, res = response, next ) => {

    const query = { status: 'active' }
    const [ total, users ] = await Promise.all([
        User.count({ where: query }),
        User.findAll({ 
            where: query,  
            attributes: [ 'id', 'userName', 'email', 'role', 'status' ]
        })
    ])

    res.status( 200 ).json({
        total,
        users
    })
})

const updateUserInfo = catchAsync( async( req, res, next ) => {

    const { userName, email } = req.body
    const { id } = req.params

    const userToUpdate = await User.findOne({ where: { id } })

    if( userName.length > 0 ){
        await userToUpdate.update({ userName })
    }if( email.length > 0 ){
        await userToUpdate.update({ email })
    }

    res.status( 200 ).json({
       ok: true,
       msg: 'User update succesfully'
    })
})

const DeleteUser = catchAsync(async( req, res, next ) => {

    const { id } = req.params
    const query = { status: 'disabled' }

    const userToDelete = await User.findOne({ where: { id } })
    await userToDelete.update( query )

    res.status( 200 ).json({
        ok: true,
        msg: 'User deleted succesfully'
    })
})

module.exports = {
    getAllActiveUsers,
    updateUserInfo,
    DeleteUser
}

