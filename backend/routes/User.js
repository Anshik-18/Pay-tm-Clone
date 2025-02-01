const express = require("express")
const Userrouter = express.Router()
const zod = require("zod")
const {User,Account} = require("../db")
const JWT_secret = require("../Config")
const jwt = require("jsonwebtoken")
const { authorize } = require("../middleware")

const zod_schema = zod.object({
    UserName : zod.string().email().min(3),
    Password : zod.string().min(8),
    FirstName : zod.string().min(3),
    LastName  : zod.string().max(50).optional(),

})

const updatebody  = zod.object({
    Password: zod.string().optional(),
    FirstName: zod.string().optional(),
    LastName: zod.string().optional()
})
Userrouter.post("/signup", async (req,res)=>{
    
    const userinfo = req.body
    const isvalid  = zod_schema.safeParse(userinfo)

    if(!isvalid.success){
        res.status(400).json({
             msg: "please check your input", errors: isvalid.error.errors 
        })
        return 
    }

    const existingUser = await User.findOne({ UserName: userinfo.UserName });
    if(existingUser){
        return res.status(400).json({
          msg: "Username already exists, please choose a different one.",
        });
      }

      
      const newuser = new User(userinfo)
      await newuser.save()
      // creating the account also
      const userid =  newuser._id;
      await Account.create({
        userid,
        balance : 1+Math.random()*1000
      })
    const token = jwt.sign({ userid : newuser._id},JWT_secret)
    res.status(201).json({
        msg:"Sucessfuly signedup",
        token : token

    })
})


Userrouter.post("/signin", async (req,res)=>{
    const userinfo = req.body
    const isvalid  = zod_schema.safeParse(userinfo)
    const username  = userinfo.UserName


    if(!isvalid.success){
        res.status(400).json({
             msg: "Please checkyour input", errors: isvalid.error.errors 
             
        })
        return;
    }
   const userexist  = await User.findOne({UserName : username})
   console.log(userexist)
   if(userexist){
    if(userexist.Password == userinfo.Password){
    const token = jwt.sign({userid :userexist._id },JWT_secret)

        res.status(200).json({
            msg:"successfuly signed in",
            token
        })
        return
    }
    else{
        res.status(411).json({
            msg:"wrong password try again"
        }) 
        return 
    }
   }
   else{
    res.status(411).json({ 
        mmsg:"the user doesn't exist"
    })
    return
   }
})

Userrouter.put("/update",authorize, async(req,res)=>{
    const updatingdata = req.body
    const user_id =  req.userid;
    // validating the user inpput  
    const validation =  updatebody.safeParse(updatingdata);
    if(!validation.success){
        res.status(400).json({
            msg:"sorry please check again the inputs "
        })
    }
   

    await User.updateOne(
        { _id: user_id },  // Filter: Find the user by ID
        { $set: req.body } // Update: Apply changes from req.body
    );

    res.json({
        msg:"sucesfully updated",
    
    })
 
} )

Userrouter.get("/bulk",async(req,res)=>{
    const filter  = req.query.filter||"";
    const users  = await User.find({
        $or : [{
            FirstName:{
                "$regex" : filter
            }
        },{
            LastName:{
                "$regex" : filter
                
            }
        }
    ]
})

res.status(202).json({
    user:users.map(user=>({
        UserName:user.UserName,
        FirstName:user.FirstName,
        LastName:user.LastName,
        _id:user._id
    }))
})


})



module.exports = Userrouter