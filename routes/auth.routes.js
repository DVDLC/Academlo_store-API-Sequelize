// libraries
const { Router } = require("express");
// controllers
const { login, signin } = require("../controllers/auth.controllers");
// Middlewares
const { userExists, validateSignInParams, validateEmailInDB } = require("../middlewares/auth.middlewares");

const routes = Router()

routes.post( '/login', [ 
    userExists 
], login )

routes.post( '/signin', [ 
    validateSignInParams,
    validateEmailInDB 
], signin )

module.exports = routes