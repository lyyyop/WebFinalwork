const express=require('express')
const mongoose = require('mongoose');
const app = express();
const ejs=require('ejs')
mongoose.connect('mongodb://172.21.2.236:27017/190110910232');
const UserSchema = {
    name: String,
    password: String
};
const User = mongoose.model("User" , UserSchema);
const BookSchema = {
    author: String,
    title: String,
    place: String,
    price: Number
  };
const Book = mongoose.model("Book" , BookSchema);

app.use('/',express.static('public'))

app.get("/a",(req,res)=>{
    if(req.query.Upassword===req.query.UpasswordConf){
        const user1 = new User({ name: req.query.Uname,password:req.query.Upassword });
        user1.save()
    }
    res.sendFile('public/login.html', {"root": __dirname}) 
})
app.listen(10232)