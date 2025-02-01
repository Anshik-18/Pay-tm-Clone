const express = require("express")
const {Account}  = require("../db")
const Accountrouter = express.Router()
const { authorize } = require("../middleware")
const mongoose = require("mongoose")






Accountrouter.get("/get",authorize, async(req,res)=>{
    const userid  = req.userid
    const account = await Account.findOne({
        userid:userid
    })

    if(!account){
        res.status(400).json({
            msg:"sorry account not found "
        })
    }
    res.status(200).json({
        msg:"your bank balance is",
        balance:account.balance
    })
})
Accountrouter.post("/transfer",authorize, async(req,res)=>{
 try{   const session = await mongoose.startSession();
    session.startTransaction();


    const {to, amount} = req.body;
    const account =  await Account.findOne({userid : req.userid}).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
            msg:"Insufficient balance"
        })
        return
    }
    const toacount =   await Account.findOne({userid : to}).session(session)

    if(!toacount){
        await session.abortTransaction();
        res.status(400).json({
            msg:"Invalid account"
        })
        return 
    }

    await Account.updateOne({userid:req.userid},
        {$inc:{balance: -amount}} ).session(session)
    await Account.updateOne({userid:to},
        {$inc:{balance: amount}} ).session(session)

        await session.commitTransaction()
        res.json({
            msg:"transaction successful"
        })
        session.endSession();
    }
    catch(err){
        res.status(500).json({ msg: "Internal server error", error: error.message });

    }

})




module.exports = Accountrouter