const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const db=require('./dbConenctions/dbConnection')
const todoRouter=require('./routes/todoRoutes/todoRoute')
const port='3500' | process.env.PORT
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use(db,(req,res,next)=>{
    next()
})
app.use(todoRouter)
app.listen(port,()=>{
    console.log(`Server up on port ${port}`)
})