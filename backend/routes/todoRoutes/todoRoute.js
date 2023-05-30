const express=require('express')
const todoCollection = require('../../models/todoModels/todoModel')
const todoRouter=express.Router()
require("dotenv").config()

const BASE_URL=process.env.BASE_URL
todoRouter.post(`${BASE_URL}`,async(req,res)=>{
    try{
        const newTask=new todoCollection(req.body)
        console.log(req.body)
        newTask.save()
        const tasks=await todoCollection.find()
        res.send(tasks)
    }catch(e){
       const statusCode = e.status || 500;
       res.status(statusCode).send(e.message)
    }
})

todoRouter.get(`${BASE_URL}`,async(req,res)=>{
    try{
        const newTask=await todoCollection.find()
        res.send(newTask)
    }catch(e){
        const statusCode = e.status || 500;
        res.status(statusCode).send(e.message)
    }
})

todoRouter.patch(`${BASE_URL}/:id`,async(req,res)=>{
    try{
        await todoCollection.findByIdAndUpdate({_id:req.params.id},req.body, {new:true})
        res.send("!Task Updated")
    }catch(e){
        const statusCode = e.status || 500;
        res.status(statusCode).send(e.message)
    }
})

todoRouter.delete(`${BASE_URL}/:id`,async(req,res)=>{
    try{
        await todoCollection.findByIdAndDelete({_id:req.params.id}, {new:true})
        const tasks=await todoCollection.find()
        res.send(tasks)
    }catch(e){
        const statusCode = e.status || 500;
        res.status(statusCode).send(e.message)
    }
})

module.exports=todoRouter