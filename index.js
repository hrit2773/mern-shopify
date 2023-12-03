require('dotenv').config()

const path=require('path')
const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt=require('bcryptjs')
const app=express()

const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const cartProductRoutes=require('./routes/cartProductRoutes')
const orderRoutes=require('./routes/orderDetailRoutes')
const model=require('./model/users')
const users=model.Users
const { default: mongoose } = require('mongoose');
app.use(express.static(path.resolve(__dirname,'dist')))

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products',productRoutes.Router)
app.use('/users',userRoutes.Router)
app.use('/cartProducts',cartProductRoutes.Router)
app.use('/orders',orderRoutes.Router)
main().catch(err => console.log(err));

const resetTokens = {};


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})
app.post('/forgot-password', async (req, res) => {
  const email = req.body.email;
  const user =await users.findOne({"email":email});

  if (user) {
    const resetToken = crypto.randomBytes(20).toString('hex');
    resetTokens[user._id] = {resetToken:resetToken,timestamp:Date.now()};

    const mailOptions = {
      from: 'shopify@gmail.com',
      to: email,
      subject: 'Shopify password Reset',
      text: `Click the following link to reset your password: http://myshopify.vercel.app/reset-password/${resetToken}. This link will expire in 1 hour.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
  } else {
    res.json({ message: 'User not found' });
  }
});

app.post('/orderplaced/:user', async (req, res) => {
  const email = req.params.user;

  const mailOptions = {
    from: 'shopify@gmail.com',
    to: email,
    subject: 'Shopify Order Confirmation',
    text: `Your shopify Order is placed.Total amount:$${req.body.total}.To cancel your order reply 'No' to this email.You can pay the amount at the time of delivery `
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.json({ message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully' });
    }
  })
  
});


app.post('/reset-password', async (req, res) => {
  const resetToken = req.body.resetToken;
  const newPassword=req.body.newPassword

  
  const userId = Object.keys(resetTokens).find(id => resetTokens[id].resetToken === resetToken);

  if (userId) {
    
    const expirationTime = 60 * 60 * 1000; 
    const tokenTimestamp = resetTokens[userId].timestamp;
    console.log(tokenTimestamp)
    if (Date.now() - tokenTimestamp <= expirationTime) {
      
      await users.findByIdAndUpdate(userId,{"password":bcrypt.hashSync(newPassword,10)})

      
      delete resetTokens[userId];

      res.json({ message: 'Password reset successfully' });
    } else {
      res.json({ message: 'Reset token has expired' });
    }
  } else {
    res.json({ message: 'Invalid reset token' });
  }
});


async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.listen(8080,()=>{
    console.log('server started')
})
