const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const userModel = require('./model/user.model');
const quotesModel = require('./model/quotes.model');
require('dotenv').config()
const {MONGO_URL} = process.env



mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
    });


const generateRandomQuote = () => {
    const randomQuotes = [
        "The best way to predict the future is to create it.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "It does not matter how slowly you go as long as you do not stop.",
        "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "It always seems impossible until it's done.",
        "You are never too old to set another goal or to dream a new dream.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not in what you have, but who you are.",
        "The only way to do great work is to love what you do.",
    ];
    
    return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    };


const seedDatabase= async()=>{
    try {
        await userModel.deleteMany({})
        await quotesModel.deleteMany({})

        const users = [];

        for(let i = 0; i < 5; i++){
            const hanshedPassword = await bcrypt.hash('123', 10);
            const user = await userModel.create({
                email : `user${i + 1}@example.com`,
                password : hanshedPassword,
                userName : `user ${i + 1}`
            })

            users.push(user)
        }

        for(let user of users){
            for(let i=0; i<3; i++){
                await quotesModel.create({
                    text : generateRandomQuote(),
                    author : user._id
                })
            }
        }

    mongoose.connection.close()

    } catch (error) {
        console.log(error)
        mongoose.connection.close()
    }
}


seedDatabase()
