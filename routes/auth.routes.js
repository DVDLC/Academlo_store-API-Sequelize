// libraries
const { Router } = require("express");
// controllers
const { login, signin } = require("../controllers/auth.controllers");
// Middlewares
const { userExists, validateSignInParams } = require("../middlewares/auth.middlewares");

const routes = Router()

routes.post( '/login', [ userExists ], login )

routes.post( '/signin', [ validateSignInParams ], signin )

module.exports = routes