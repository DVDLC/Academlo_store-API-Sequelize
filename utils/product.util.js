const { catchAsync } = require("./try-catch.utils");


const updateQuantity = catchAsync( async( product, quantity, reason ) => {

    let realQT = product.quantity
 
    switch ( reason ) {
        case 'decrement':
            realQT = product.quantity - quantity

            await product.update({ 
                quantity: realQT, 
                status: realQT === 0
                    ? 'outofstock'
                    : 'active'
            })
            break;
        case 'increment':
            realQT = product.quantity + quantity

            await product.update({ 
                quantity: realQT, 
                status: realQT === 0
                    ? 'outofstock'
                    : 'active'
            })
        break;
        case 'update':
            await product.update({ 
                quantity, 
                status: quantity === 0
                    ? 'outofstock'
                    : 'active'
            })
        break;
        default:
            break;
    }
})

module.exports = {
    updateQuantity
}