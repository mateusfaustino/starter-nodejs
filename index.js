const PORT = 3000
const { urlencoded } = require('express')
const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const userRoutes = require('./routes/userRoutes')
dotenv.config()

const app = express()
app.use(express.json())

app.use('/user', userRoutes)
app.get('/',(req,res)=>{
    res.json({message:"hello"})
})

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@api-node.pvowd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)
.then(()=>{
    console.log("Mongo DB cennected")
    app.listen(PORT)
})
.catch((err)=>{
    return console.log("Erro na nonecção:", err)
})