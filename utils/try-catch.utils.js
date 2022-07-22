const { ApiError } = require("./app-error-handler")
const { HttpStatusCode } = require("./http-statusCode")

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch( err => next(err) )
}

module.exports = {
    catchAsync
}