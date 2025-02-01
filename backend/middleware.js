const jst = require("jsonwebtoken")
const JWT_secret = require("./Config")

const authorize  = (req,res,next)=>{
    const token = req.headers['authorization'];
   
    if(!token || !token.startsWith("Bearer ")){
        res.status(400).json({
            msg:"sorry no token provided"
        })
        return
    }
    
    const tokenWithoutBearer = token.replace("Bearer ", "");
  

    try {
        const decoded  =  jst.verify(tokenWithoutBearer,JWT_secret);
        
        if(decoded.userid){

            req.userid = decoded.userid
            next()
        }
        else{
            res.status(400).json({
                msg:"invalid token"
            })
            return
        }

    }
    catch(error){
        res.status(400).json({
            msg:"invalid token",
            error
        })
        return 
    }


}
module.exports= {
    authorize
}