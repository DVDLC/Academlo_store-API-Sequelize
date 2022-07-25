// Libraires
const { response } = require("express");
// Models
const { Category } = require("../models/category.model");
// Utils
const { catchAsync } = require("../utils/try-catch.utils");

const getAllCategories = catchAsync(async( req, res = response, next ) => {

    const query = { status: 'active' }

    const [ total, categories ] = await Promise.all([
        Category.count({ where: query }),
        Category.findAll({ where: query })
    ])

    res.status( 200 ).json({
        total,
        categories
    })
})

const createCategorie = catchAsync( async( req, res = response, next ) => {  

    const { ...props } = req.body

    const newCategory = await Category.build({ ...props })
    await newCategory.save()
    
    res.status( 200 ).json({
        newCategory
    })
})

const updateCategorie = catchAsync( async( req, res = response, next ) => {

    const { ...props } = req.body
    const category = req.category

    await category.update({ ...props })

    res.status( 200 ).json({
        ok: true,
        msg: 'Categoy updated :D',
        category
    })
})

module.exports = {
    getAllCategories,
    createCategorie,
    updateCategorie
}