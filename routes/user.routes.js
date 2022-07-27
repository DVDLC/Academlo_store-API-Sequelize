// Libraries
const { Router } = require('express');
// controllers
const { 
    getAllActiveUsers, 
    updateUserInfo, 
    DeleteUser 
} = require('../controllers/user.controller')
const { 
    getUserProductsForSale, 
    getAllOrders, 
    getOrderByID 
} = require('../controllers/order.controller');
// Middlewares
const { protectSession, protectUserAccount } = require('../middlewares/jwt.middlewares');
const { verifyRole, verifyParamsInUpdate } = require('../middlewares/user.middlewares');
const { emailValidation } = require('../middlewares/auth.middlewares');
const { orderExistByID } = require('../middlewares/order.middlewares');

const router = Router()

if( process.env.NODE_ENV === 'development' ){
    router.get( '/', getAllActiveUsers )
}

// Routes protected by token, protectSession & sales role
router.use( [ protectSession ] )

router.route( '/:id' )
    .patch( [ 
        protectUserAccount,
        verifyParamsInUpdate,
        emailValidation
    ], updateUserInfo )
    .delete( [ 
        protectUserAccount 
    ], DeleteUser )

router.get( '/me',[
    verifyRole
], getUserProductsForSale )

router.get( '/orders', 
getAllOrders )

router.get( '/orders/:id', [
    orderExistByID
], getOrderByID )


module.exports = router