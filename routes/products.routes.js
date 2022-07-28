// Libraries
const { Router } = require("express");
// Controllers
const { getAllCategories, createCategorie, updateCategorie } = require("../controllers/categories.controllers");
const { 
    getAllActiveProducts, 
    getActiveProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/products.controller");
// Middlewares
const { protectSession } = require("../middlewares/jwt.middlewares");
const { verifyRole } = require("../middlewares/user.middlewares");
const { 
    categoryIsAlreadyExist, 
    verifyParams, 
    verifyIfCategoryExistInPC 
} = require("../middlewares/categories.middlewares");
const { userAlreadyPostProduct, verifyProductsParams, productExistByID } = require("../middlewares/products.middlewares");
// utils
const { upload } = require("../utils/upload.utils");

const routes = Router()

// No protected routes
routes.get( '/', getAllActiveProducts )

routes.get( '/categories', getAllCategories )

routes.get( '/:id', productExistByID, getActiveProduct )

// Protected routes
routes.use([ 
    protectSession,
    verifyRole 
])

routes.post( '/', [
    upload.array( 'img', 3 ),
    verifyProductsParams,
    verifyIfCategoryExistInPC,
    userAlreadyPostProduct
], createProduct )


routes.patch( '/:id', [ 
    productExistByID 
], updateProduct )

routes.delete( '/:id', [ 
    productExistByID 
], deleteProduct )

routes.post( '/categories', [
    verifyParams,
    categoryIsAlreadyExist
], createCategorie )

routes.patch( '/categories/:id', [
    verifyParams,
    categoryIsAlreadyExist
], updateCategorie )

module.exports = routes