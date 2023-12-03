const model=require('../model/users')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const users=model.Users
exports.createUser=async (req,res)=>{
    try{
        const user=new users(req.body)
        let token=jwt.sign(req.body,process.env.SECRET_KEY,{
            expiresIn:"24h"
        })
        user.token=token
        user.password=bcrypt.hashSync(req.body.password,10)
        const loggedUser=await user.save()
        res.json(loggedUser)
    }
    catch(err){
        res.json(err)
    }
}
exports.validateUser=async (req,res)=>{
    try{
        let token=req.headers.authorization
        let payload=jwt.verify(token,process.env.SECRET_KEY)
        res.json(payload)
    }
    catch(err){
        res.json({msg:"could not authenticate"})
    }
}
exports.loginUser=async (req,res)=>{
    try{
        
        let token=jwt.sign(req.body,process.env.SECRET_KEY,{
            expiresIn:"24h"
        })
        await users.findOneAndUpdate({email:req.body.email},{token:token})
        const loggedUser=await users.findOne({email:req.body.email})
        if (!loggedUser){
            res.json({emailMsg:"User does not exist"})
        }
        else{
            const check_password=bcrypt.compareSync(req.body.password,loggedUser.password)
            if (check_password){
                res.json(loggedUser)
            }
            else if (!check_password){
                res.json({passwordMsg:"Wrong password"})
            }
        }
    }
    catch(err){
        res.json(err)
    }
}