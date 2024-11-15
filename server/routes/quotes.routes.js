const { deleteQuote, updateQuote, createQuote, getQuoteById, getQuotes } = require('../controller/quotesController');
const { tokenValidation } = require('../middleware/tokenCheck');
const router = require('express').Router();


router.get('/', getQuotes);
router.get('/:id',getQuoteById)
router.post('/',tokenValidation, createQuote)
router.put('/:id',tokenValidation, updateQuote)
router.delete('/:id',tokenValidation, deleteQuote)



module.exports = router;