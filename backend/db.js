const mongoose= require("mongoose")
const { string, number } = require("zod")
mongoose.connect("mongodb+srv://upadhyaykartikey1920:TCfFAur5bKUz8HgU@cluster0.x0eme.mongodb.net/Paytm?retryWrites=true&w=majority")

const paytmschema = mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3

    },
    Password:{
        type:String,
        required:true,
        minlength:8
    },
    FirstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    LastName:{
        type:String,
        trim:true,
        maxlength:50 
    },

})
const accountbalanceschema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required: true 
    },
    balance: {
         type: Number, 
         required: true }
});

const User = mongoose.model('paytm',paytmschema)
const Account = mongoose.model('Account',accountbalanceschema)
module.exports =  {User,Account}