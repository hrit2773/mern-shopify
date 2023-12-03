const model=require('../model/product')

const products=model.Products
exports.createProduct=async (req,res)=>{
    console.log(req.body)
    const product=new products(req.body)
    data=await product.save()
    console.log(data)
    res.json(data)
}
exports.getAllProducts=async (req,res)=>{
    const allProducts=await products.find()
    res.json(allProducts)
}
exports.getProduct=async (req,res)=>{
    const product=await products.findById(req.params.id)
    res.json(product)
}
exports.replaceProduct=async (req,res)=>{
    await products.findOneAndReplace({_id:req.params.id},req.body)
    res.sendStatus(201)
}
exports.deleteProduct=async (req,res)=>{
    deletedData=await products.findByIdAndDelete(req.params.id)
    res.json(deletedData)
}