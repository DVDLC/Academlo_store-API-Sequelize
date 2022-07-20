const { response } = require("express");
const { catchAsync } = require("../utils/try-catch.utils");

const getAllCategories = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'GET - get all active categories'
    })
})


const createCategorie = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'POST - create categorie'
    })
})

const updateCategorie = catchAsync(( req, res = response, next ) => {
    res.status( 200 ).json({
        ok: true,
        msg: 'PATCH - update categorie'
    })
})

module.exports = {
    getAllCategories,
    createCategorie,
    updateCategorie
}