const mongoose=require('mongoose')
const {Schema}=mongoose
const ProductSchema=new Schema({
    title: String,
    description:String,
    price:Number,
    discountPercentage:Number,
    rating:Number,
    brand:String,
    category:String,
    thumbnail:String,
    images:[String],
})
exports.Products=mongoose.model('Products',ProductSchema)