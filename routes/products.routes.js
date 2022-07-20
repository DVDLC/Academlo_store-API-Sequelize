const { Router } = require("express");
const { getAllCategories, createCategorie, updateCategorie } = require("../controllers/categories.controllers");
const { 
    getAllActiveProducts, 
    getActiveProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/products.controller");

const routes = Router()

routes.get( '/', getAllActiveProducts )

routes.get( '/:id', getActiveProduct )

routes.get( '/categories', getAllCategories )

// Protect routes
/*
    TODO: 
        · User role should be "sales"
        · If user update or delete verify if product exist
*/
routes.post( '/', createProduct )

routes.patch( '/:id', updateProduct )

routes.delete( '/:id', deleteProduct )

/* 
    TODO:
     · Verify if user is admin and active  
*/

routes.post( '/categories', createCategorie )

routes.patch( '/categories/:id', updateCategorie )

module.exports = routes