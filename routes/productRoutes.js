const express=require('express')
const router=express.Router()
const controller=require('../controller/productController')
router
    .get('/',controller.getAllProducts)
    .post('/',controller.createProduct)
    .get('/:id',controller.getProduct)
    .put('/:id',controller.replaceProduct)
    .delete('/:id',controller.deleteProduct)
    

exports.Router=router