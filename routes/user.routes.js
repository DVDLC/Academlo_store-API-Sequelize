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

const router = Router()

router.get( '/', getAllActiveUsers )

router.patch( '/:id', updateUserInfo )

router.delete( '/:id', DeleteUser )

router.get( '/me', getUserProductsForSale )

router.get( '/orders', getAllOrders )

router.get( '/orders/:id', getOrderByID )


module.exports = router