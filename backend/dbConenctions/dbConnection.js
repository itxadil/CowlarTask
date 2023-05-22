const mongooseConnection=require('mongoose')
const mongoDBURL='mongodb://localhost:27017/cowlarTODO'

const db=mongooseConnection.connect(mongoDBURL)
db.then(()=>{
    console.log('Connection successful')
  });
  
db.catch((e)=>{
  console.log(e)
})
module.exports=db