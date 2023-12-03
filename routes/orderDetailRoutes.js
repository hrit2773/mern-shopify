const express=require('express')
const router=express.Router()
const controller=require('../controller/orderDetailsController')

router
    .post('/',controller.postOrderDetails)
    .get('/:user',controller.getOrders)
    .get('/',controller.getAllOrders)
    .patch('/',controller.updateStatus)
exports.Router=router