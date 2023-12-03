const express=require('express')
const router=express.Router()
const controller=require('../controller/cartProductController')
router
    .get('/:user',controller.getfromCart)
    .get('/calculate/:user',controller.calculateTotal)
    .post('/',controller.addToCart)
    .delete('/:id',controller.deleteFromCart)
    .delete('/delete/:user',controller.deleteAllProducts)
    .patch('/increase/:id',controller.increaseQuantity)
    .patch('/decrease/:id',controller.decreaseQuantity)
exports.Router=router