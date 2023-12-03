const mongoose=require('mongoose')
const {Schema}=mongoose
const productDetailSchema= new Schema({
    title: String,
    thumbnail:String,
    price: Number,
    quantity: Number,
})
const orderDetailSchema=new Schema({
    products:{
        type: [productDetailSchema]
    },
    total_price:Number,
    status:String,
    payment:String,
    City:String,
    Phone:String,
    State:String,
    country:String,
    email:String,
    Name:String,
    streetAddress:String,
    zip:String,
    user:String
})
exports.orders=mongoose.model('orderDetails',orderDetailSchema)