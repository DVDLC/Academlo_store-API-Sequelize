// Models
const { Order } = require("../models/order.model");
// Utils
const { ApiError } = require("../utils/app-error-handler");
const { HttpStatusCode } = require("../utils/http-statusCode");
const { catchAsync } = require("../utils/try-catch.utils");

const orderExistByID = catchAsync( async( req, res, next ) => {

    const { sessionUser } = req
    const { id } = req.params

    const query = { id, userId: sessionUser.id }

    const order = await Order.findOne({ where: query })

    if(!order) return next( new ApiError( 
        HttpStatusCode.BAD_REQUEST, 
        'The order you are looking for does not exist'
    ))

    req.order = order
    next()
})

module.exports = {
    orderExistByID
}