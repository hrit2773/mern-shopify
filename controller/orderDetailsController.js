const model=require('../model/orderDetails')
const mongoose=require('mongoose')
const orders=model.orders
exports.postOrderDetails=async (req,res)=>{
    const order=new orders(req.body)
    const data=order.save()
    res.json(data)
}
exports.getOrders=async (req,res)=>{
    const data=await orders.find({user:req.params.user})
    res.json(data)
}
exports.getAllOrders=async (req,res)=>{
    const data=await orders.find()
    res.json(data)
}
exports.updateStatus=async (req,res)=>{
    console.log(req.body)
    await orders.findByIdAndUpdate(req.body.id,{"status":req.body.status})
    const updatedData=await orders.find()
    res.json(updatedData)
}