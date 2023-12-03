const express = require('express')
const model=require('../model/cartProduct')
const cartProducts=model.cartProducts
exports.addToCart= async (req,res)=>{
    const product=new cartProducts(req.body)
    await product.save()
    const data=await cartProducts.find({user:req.body.user})
    res.json(data)
}
exports.getfromCart=async (req,res)=>{
    let user=req.params.user
    const data=await cartProducts.find({user:user})
    res.json(data)
}
exports.deleteFromCart=async (req,res)=>{
    
    const data= await cartProducts.findByIdAndDelete(req.params.id)
    res.json(data)

}
exports.increaseQuantity=async (req,res)=>{
    const data= await cartProducts.findById(req.params.id)
    await cartProducts.findByIdAndUpdate(req.params.id,{"quantity": data.quantity+1})
    const updatedData=await cartProducts.find({user:data.user})
    res.json(updatedData)
}
exports.decreaseQuantity=async (req,res)=>{
    const data= await cartProducts.findById(req.params.id)
    await cartProducts.findByIdAndUpdate(req.params.id,{"quantity": data.quantity-1})
    const updatedData=await cartProducts.find({user:data.user})
    res.json(updatedData)
}
exports.calculateTotal=async (req,res)=>{
    let products=await cartProducts.find({"user":req.params.user})
    let total=0
    for (let product of products){
        total+=product.quantity*product.price
    }
    res.json({cart_total:total})
}
exports.deleteAllProducts=async (req,res)=>{
    let count=await cartProducts.deleteMany({"user":req.params.user})
    res.json(count)
}