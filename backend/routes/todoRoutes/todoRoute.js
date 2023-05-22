const express=require('express')
const todoCollection = require('../../models/todoModels/todoModel')
const todoRouter=express.Router()

todoRouter.post('/task',async(req,res)=>{
    try{
        const newTask=new todoCollection(req.body)
        console.log(req.body)
        newTask.save()
        res.send("New task Added")
    }catch(e){
       res.status(500).send(e)
    }
})

todoRouter.get('/task',async(req,res)=>{
    try{
        const newTask=await todoCollection.find()
        res.send(newTask)
    }catch(e){
       res.status(500).send(e)
    }
})

todoRouter.patch('/task/:id',async(req,res)=>{
    try{
        await todoCollection.findByIdAndUpdate({_id:req.params.id},req.body, {new:true})
        res.send("!Task Updated")
    }catch(e){
       res.status(500).send(e)
    }
})

todoRouter.delete('/task/:id',async(req,res)=>{
    try{
        await todoCollection.findByIdAndDelete({_id:req.params.id}, {new:true})
        res.send("!Task Deleted")
    }catch(e){
       res.status(500).send(e)
    }
})

module.exports=todoRouter