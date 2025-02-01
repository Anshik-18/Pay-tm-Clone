const express = require("express")
const router = express.Router()
const Userrouter = require("./User")
const Accountrouter = require("./Account")
const User = require("../db")


router.use("/user",Userrouter);
router.use("/account",Accountrouter);


module.exports= router;
