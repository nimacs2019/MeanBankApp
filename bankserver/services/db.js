// import mongoose
const mongoose=require('mongoose')

// for connection String
mongoose.connect('mongodb://localhost:27017/Bank',()=>{
    console.log('mongodb connected successfully.....');
})

// create an model to store data
const User =mongoose.model('User',{
    acno:Number,
    pswd:String,
    balance:Number,
    uname:String,
    transaction:[]
})

module.exports= {
    User
}