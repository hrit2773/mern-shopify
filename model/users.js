const mongoose=require('mongoose')
const {Schema}=mongoose
const userSchema=new Schema({
    email:String,
    password:String,
    token:String
})
exports.Users=mongoose.model('users',userSchema)