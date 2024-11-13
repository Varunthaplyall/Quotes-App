const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env;


const tokenValidation = (req,res,next)=>{
    const token = req.headers['authorization']

    if(token && token.startsWith('Bearer')){
        const actualToken = token.split(' ')[1]

        const tokenVerify = jwt.verify(actualToken, JWT_SECRET, (err, decode)=>{
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access, invalid token"
                });
            }

            req.user = decode;
            next()
        })

     
    }else{
            return res.status(403).json({
                success: false,
                message: "Forbidden, no token provided"
            })


        }
}

module.exports = {tokenValidation}