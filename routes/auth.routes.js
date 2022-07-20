// libraries
const { Router } = require("express");
// controllers
const { login, signin } = require("../controllers/auth.controllers");

const routes = Router()

routes.post( '/login', login )

routes.post( 'signin', signin )

module.exports = routes