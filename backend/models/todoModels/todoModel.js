const { default: mongoose } = require("mongoose");

const todoSchema=mongoose.Schema({
    task: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      completedTime: {
        type: Date,
        default: null,
      },
      creationTime: {
        type: Date,
        default: null,
      }
})

const todoCollection=mongoose.model('todoCollections', todoSchema)
module.exports=todoCollection