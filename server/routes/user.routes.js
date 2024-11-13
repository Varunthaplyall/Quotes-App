const { tokenValidation } = require('../middleware/tokenCheck')
const quotesModel = require('../model/quotes.model')
const userModel = require('../model/user.model')
const router = require('express').Router()


router.get('/me', tokenValidation, async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password")
        const quotes = await quotesModel.find({author:userId})
        res.status(200).json({
            user,
            quotes
        })
    } catch (error) {
        res.status(500).json({
            sucess : false,
            message : "something went wrong"
        })
        console.log(error)
    }   
})

module.exports = router;