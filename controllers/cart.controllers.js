// Libraries
const { response } = require("express");
// Models
const { Cart } = require("../models/cart.model");
const { ProductInCart } = require("../models/productInCart.model");
// Utils
const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");
// Utils
const { ApiError } = require("../utils/app-error-handler");
const { HttpStatusCode } = require("../utils/http-statusCode");
const { catchAsync } = require("../utils/try-catch.utils");
const { updateQuantity } = require("../utils/product.util");


const addProductToCart = catchAsync(async( req, res = response, next ) => {

    const { productId, quantity } = req.body   
    const { id } = req.sessionUser
    const { product } = req 
    
    const query = { userId: id, status: 'active' }

    // Verify if the cart is empty if not, change it to active
    let userCart = await Cart.findOne({ where: query })
    if( !userCart ) { 
        userCart = await Cart.build( query ) 
        await userCart.save()
    }

    // verify If productInCart is already exist
    const isProductAlreadyExistInCart = await ProductInCart.findOne({ 
        where: { cartId: userCart.id, productId, status: 'active' } 
    })
    
    if( isProductAlreadyExistInCart ) return next( new ApiError(
        HttpStatusCode.BAD_REQUEST,
        'The product is already exist in your cart'
    ))

    // Once created, we can create and add products to the cart
    const productInCart = await ProductInCart.build({ cartId: userCart.id, productId, quantity })
    await productInCart.save()

    // Once created and saved, we proceed to update the quantity of the product
    updateQuantity( product, quantity, 'decrement' )

    res.status( 200 ).json({
        productInCart,
        userCart,
        isProductAlreadyExistInCart
    })
})

const updateCart = catchAsync(async( req, res = response, next ) => {

    const { quantity } = req.body
    const { productInCart } = req
    const { product } = req
    
    // I have to save the real quantity in productInCart, because It have a bug 
    const realQuantity = productInCart.quantity

    if( quantity && !isNaN( quantity ) ){

        // New quantuty to save in product
        const newQty = product.quantity + realQuantity - quantity
        
        // Update product quantity
        await updateQuantity( product, newQty, 'update' )

        // Once the product has been updated, we update productInCart
        await productInCart.update({ quantity })
    }

    res.status( 200 ).json({
        productInCart,
        product
    })
})

const deleteProductInCart = catchAsync(async( req, res = response, next ) => {

    const { productInCart } = req
    const { product } = req
    
    await productInCart.update({ quantity: 0, status: 'removed' })

    updateQuantity( product, productInCart.quantity, 'increment' )

    res.status( 200 ).json({
        productInCart
    })
})

const purchaseCart = catchAsync(async( req, res = response, next ) => {

    const { sessionUser } = req
    const queryCart = { userId: sessionUser.id, status: 'active' }

    // Get the cart to know which products are active
    const cart = await Cart.findOne({ 
        where: queryCart, 
        include: [{
            model: ProductInCart,
            where: { status: 'active' },
            attributes: [ 'id', 'cartId', 'productId', 'quantity' ]
        }]
    })

    const { productInCarts } = cart

    // Use map async to obtain the total price of the products and apply a reducer() to obtain total value
    let totalPrice = await Promise.all( 
        productInCarts.map( async ( product ) =>  {
            const products = await Product.findOne({ 
                where: { id: product.productId }
            })
            return product.quantity * products.price
    }))

    const reducer = (accumulator, curr) => accumulator + curr
    totalPrice = totalPrice.reduce( reducer )

    // Create "Order" model and update the cart status to: done
    const orderQuery = { userId: sessionUser.id, cartId: cart.id, totalPrice }

    const order = await Order.build( orderQuery )
    await order.save()

    await cart.update({ status: 'done' })

    // Send email with the order info()

    res.status( 200 ).json({
        order
    })
})

module.exports = {
    addProductToCart,
    updateCart,
    deleteProductInCart,
    purchaseCart
}