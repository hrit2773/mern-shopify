const mongoose=require('mongoose')
const {Schema}=mongoose
const cartProductSchema= new Schema({
    title: String,
    thumbnail:String,
    price: Number,
    quantity: Number,
    user: String
    
})
exports.cartProducts=mongoose.model('cartProducts',cartProductSchema)