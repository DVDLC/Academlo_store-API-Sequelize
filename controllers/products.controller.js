// Libraries
const { response } = require("express");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage")
// Models
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImgs.model");
// Utils
const { catchAsync } = require("../utils/try-catch.utils");
// firebase
const { storage } = require("../firebase/firebase.config");

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
                model: ProductImg,
                attributes: [ 'id', 'imgUrl' ]
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

    const imgs = req.files
    const { sessionUser } = req
    const { ...props } = req.body

    const imgsPath = 'productsImgs'
    let imgRef
    let imgRes

    // Create the new product
    const newProduct = await Product.build({ ...props, userId: sessionUser.id })
    await newProduct.save()

    // Save the upload imgs and create productImg with the fullpath image
    const filesPromises = imgs.map( async img => {
        imgRef = ref( storage, `${imgsPath}/${ Date.now() }_${ img.originalname }` )
        imgRes = await uploadBytes( imgRef, img.buffer )
        const fullpath = await getDownloadURL(imgRef)

        return await ProductImg.create({ 
            productId: newProduct.id,
            imgUrl: fullpath
        })
    })
    await Promise.all( filesPromises )
    

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