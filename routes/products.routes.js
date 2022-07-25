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
const { categoryIsAlreadyExist, verifyParams } = require("../middlewares/categories.middlewares");
const { protectSession } = require("../middlewares/jwt.middlewares");
const { verifyRole } = require("../middlewares/user.middlewares");

const routes = Router()

routes.get( '/', getAllActiveProducts )

routes.get( '/categories', getAllCategories )

routes.get( '/:id', getActiveProduct )

// Protect routes
/*
    TODO: 
        · User role should be "sales"
        · If user update or delete verify if product exist
*/

routes.use([ 
    protectSession,
    verifyRole 
])

routes.post( '/', createProduct )

routes.patch( '/:id', updateProduct )

routes.delete( '/:id', deleteProduct )


routes.post( '/categories', [
    verifyParams,
    categoryIsAlreadyExist
], createCategorie )

routes.patch( '/categories/:id', [
    verifyParams,
    categoryIsAlreadyExist
], updateCategorie )

module.exports = routes