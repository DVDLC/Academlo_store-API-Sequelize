// Libraries
const { response } = require("express");
// Models
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
// Utils
const { catchAsync } = require("../utils/try-catch.utils");

const getAllActiveProducts = catchAsync(async( req, res = response, next ) => {

    const { offset, limit } = req.query
    const query = { status: 'active' }

    const [ total, products ] = await Promise.all([
        Product.count({ where: query }),
        Product.findAll({ 
            where: query,
            attributes: [ 'id', 'title', 'price', 'quantity', 'categoryId' ],
            offset,
            limit,
            include: [{
                model: Category,
                attributes: [ 'id', 'name' ]
            }]
        })
    ])

    res.status( 200 ).json({
        total,
        products
    })
})

const getActiveProduct = catchAsync(( req, res = response, next ) => {
    const { product } = req

    res.status( 200 ).json({
        product
    })
})

const createProduct = catchAsync( async( req, res = response, next ) => {

    const { ...props } = req.body
    const { sessionUser } = req

    const newProduct = await Product.build({ ...props, userId: sessionUser.id })
    newProduct.save()

    res.status( 200 ).json({
        newProduct
    })
})

const updateProduct = catchAsync(async( req, res = response, next ) => {

    const { title, description, price, quantity, status } = req.body
    const { product } = req

    if( title && title.length !== 0){
        await product.update({ title })
    }if( description && description.length !== 0 ){
        await product.update({ description })
    }if( price && !isNaN( price ) ){
        await product.update({ price })
    }if( quantity && !isNaN( quantity ) ){
        await product.update({ quantity })
    }if( status && status.length !== 0 ){
        await product.update({ status })
    }

    res.status( 200 ).json({
        product
    })
})

const deleteProduct = catchAsync(async( req, res = response, next ) => {

    const query = { status: 'inactive' }
    const { product } = req

    await product.update( query )

    res.status( 200 ).json({
        product
    })
})

module.exports = {
    getAllActiveProducts,
    getActiveProduct,
    createProduct,
    updateProduct,
    deleteProduct
}