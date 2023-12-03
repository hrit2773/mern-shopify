const express=require('express')
const controller=require('../controller/usersController')
const router=express.Router()
router
    .post('/',controller.createUser)
    .get('/validate',controller.validateUser)
    .patch('/',controller.loginUser)
exports.Router=router