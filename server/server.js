const express = require('express');
const app = express()
require('dotenv').config()
const {PORT, MONGO_URL} = process.env;
const authRoutes = require('./routes/auth.routes');
const quotesRoutes = require('./routes/quotes.routes')
const userRoutes = require('./routes/user.routes')
const { default: mongoose } = require('mongoose');
const cors = require('cors')


app.use(express.json());
app.use(cors());

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/quotes',quotesRoutes)
app.use('/api/v1/user', userRoutes)

app.use((err,req,res,next) => {
    console.log(err);

    res.send(500).json({
        success : false,
        message : err.message || "Something went wrong",
    });
});

mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('DB connected')
    })
    .catch((error)=>{
        console.log(error)
    })


app.listen(PORT, ()=>{
    console.log('Server is up')
})

