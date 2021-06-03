const router = require("express").Router();
require('dotenv').config({ path: '.env' })
const {MongoClient} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbUrl = process.env.REACT_APP_DATABASE_ACCESS;
const key = process.env.JWT_KEY;
const nodemailer = require('nodemailer');

router.post('/login', async (req,res)=>{
    try{
        let {email,password} = req.body;
        let client = await MongoClient.connect(dbUrl)
        let db = client.db('myDB')
        let data = await db.collection("users").findOne({email});
        if(data){
            let isValid = await bcrypt.compare(password,data.password)
            if(isValid){
                res.status(200).json({
                    message: "Login Successful"
                })
            }else{
                res.status(200).json({
                    message:"Invalid Credentials"
                })
            }
        }else{
            res.status(404).json({
                message:"No user found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: error
        })
    }
})

router.post('/register', async (req,res)=>{
    try{
    let client = await MongoClient.connect(dbUrl)
    let db = client.db('myDB')    
    let data = await db.collection("users").findOne({email:req.body.email});
    const securePassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = securePassword
    if(!data){
        await db.collection("users").insertOne(req.body)
        res.status(200).json({
            message:"User registered"
        })
    }else{
        res.status(200).json({
            message:"User already registered"
        })
    }
    }
    catch(error){
        res.status(400).json({
            message:error
        })
    }
})

router.post('/forgotpassword', async (req,res)=>{
   try{ 
       let client = await MongoClient.connect(dbUrl)
       let db = client.db('myDB');
       let data = await db.collection("users").findOne({email:req.body.email})
   
       if(data){
        let token = jwt.sign({data: data.email }, key, { expiresIn: '20m' });
       await db.collection("users").findOneAndUpdate({email:req.body.email},{ $set: { token } });
       var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });
      
      let mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Password Reset Link',
        html: `<a href="${process.env.CLIENT_SERVER}/resetpassword/${token}" target="blank">http://localhost:3000/resetpassword/${token}</a>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
           
            return res.status(200).json({
                message:'Email sent to: ' + req.body.email
            }) 
          
        }
      });
     }else{
        return res.status(200).json({
             message:"User not found"
         })
     }
     
    }
    catch(error){
        res.status(404).json({
            message:error
        })
    }
})

router.post('/resetpassword', async (req,res)=>{
    try{
        
        const token = req.body.token;
        const newPassword = req.body.password;
        let client = await MongoClient.connect(dbUrl)
        let db = client.db('myDB');
        if(token){
            jwt.verify(token,key,async function(error,decoded){
                if(error){
                    return res.status(400).json({message:"Incorrect or expired link"})
                }
                let email = decoded.data     
                const password = await bcrypt.hash(newPassword, 10)
                await db.collection("users").findOneAndUpdate({email},{$set:{token:'',password}})
            })
        } 
    }
    catch(error){
        res.status(400).json({
            message:error
        })
    }
})

module.exports = router
