// env
require( 'dotenv' ).config()
// Libraries
const express = require('express')
const cors = require('cors')
const path = require('node:path');
// DateBase
const { db } = require('./db/db.config')
const { dbRelations } = require('./db/db.relations')
// Utils
const { ApiError } = require('./utils/app-error-handler')
const { globalErrorHandler } = require('./utils/globalerror-handler')
const { HttpStatusCode } = require('./utils/http-statusCode')

class Server{
    constructor(){
        this.PORT = process.env.PORT || 4000
        this.app = express()
        this.paths = {
            error: '*',
            user: '/api/v1/users/',
            auth: '/api/v1/auth/',
            products: '/api/v1/products/',
            cart: '/api/v1/cart/'
        }

        // DB connection
        this.dbConnection()

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()

        // Not found
        this.notFound()

        // Error Handler
        this.errorHandler()
    }

    middlewares(){

        this.app.use( cors() )

        this.app.use( express.json() )

        // Set template engine
        this.app.set( 'view engine', 'pug' )
        this.app.set( 'views', path.join( __dirname, 'views' ) )

        // Serving static files
        this.app.use( express.static( 'public' ) )
    }

    routes(){
        this.app.use( this.paths.auth, require( './routes/auth.routes' ) )
        this.app.use( this.paths.user, require( './routes/user.routes' ) )
        this.app.use( this.paths.products, require( './routes/products.routes' ) )
        this.app.use( this.paths.cart, require( './routes/cart.routes' ) )
    }

    notFound(){
        this.app.all( this.paths.error, ( req, res, next ) => {
            next( 
                new ApiError( 
                    HttpStatusCode.NOT_FOUND,
                    `${ req.method } ${ req.originalUrl } is not found` 
                )
            )
        })
    }

    errorHandler(){
        this.app.use( globalErrorHandler )
    }

    async dbConnection(){
        try{
            await Promise.all([
                db.authenticate(),
                db.sync({ /* force: true */ })
            ])

            dbRelations()

            console.log( 'DB authenticated and sync' )
        }catch( err ){
            console.log( 'Something went wrong', err )
        }
    }

    listen(){
        this.app.listen( this.PORT, () => {
            console.log( `Server running at port ${ this.PORT }` )
        })
    }
}

module.exports = {
    Server
}