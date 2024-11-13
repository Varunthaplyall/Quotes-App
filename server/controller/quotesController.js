const quotesModel = require('../model/quotes.model');
const userModel = require('../model/user.model');


const getQuotes = async(req,res,next)=>{
    try {
      const quotes = await quotesModel.find().populate({
          path : "author",
          select : "userName"
        })
      
        res.status(200).json({
          success : true,
          quotes : quotes
        })
    } catch (error) {
      next(error) 
    }
    
};

const getQuoteById = async(req,res,next) => {
    try {
        const {id} = req.params;
        const quote = await quotesModel.findById(id);
        res.status(200).json(quote)
    } catch (error) {
        next(error)
    }   
};

const createQuote = async(req,res,next) =>{
    try {
      const userId = req.user.id
      const {text} = req.body;
      const  user = await userModel.findById(userId).select("-password");
      const quote = await quotesModel.create({text, author : user});
  
      res.status(201).json({
        ...quote.toObject(),
          author : { id : quote.author._id, userName : quote.author.userName}
      })
  
    } catch (error) {
      next(error)
    }
}


const updateQuote = async(req,res,next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const quote = await quotesModel.findByIdAndUpdate(id);
        res.status(200).json(quote)
    } catch (error) {
        next(error)
    }
}


const deleteQuote = async(req,res,next) => {
    try {
        const {id} = req.params 
        await quotesModel.deleteById(id)
        res.status(200).json(id)
    } catch (error) {
        next(error)
    }
} 


module.exports = {
    getQuotes,
    getQuoteById,
    updateQuote,
    deleteQuote,
    createQuote
}
