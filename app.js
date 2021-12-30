const express=require('express')
const mongoose = require('mongoose');
const app = express();
const ejs=require('ejs')
const session = require('express-session');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect('mongodb://172.21.2.236:27017/190110910232');
const UserSchema = {
    name: String,
    password: String,
    admin: Boolean
};
const User = mongoose.model("User" , UserSchema);
const BookSchema = {
    author: String,
    title: String,
    place: String,
    publisher: String,
    price: Number
  };
const Book = mongoose.model("Book" , BookSchema);

app.use(session({
    secret: 'secret key', //使用随机自定义字符串进行加密
    saveUninitialized: false,//不保存未初始化的cookie，也就是未登录的cookie
    cookie: {maxAge: 24 * 60 * 60 * 1000} //设置cookie的过期时间为1天
}))

app.use('/',express.static('public'))

app.get("/register",(req,res)=>{
    if(req.query.Upassword===req.query.UpasswordConf){
        const user1 = new User({ name: req.query.Uname,password:req.query.Upassword,admin:false});
        user1.save()
    }
    res.sendFile('public/login.html', {"root": __dirname}) 
})

app.post("/login",function(req,res){
    User.find({name:req.body.Uname,password:req.body.Upassword},function (err, docs){
        if(docs[0]==null){
            //res.status(401).json({status: false, msg: "账号密码错误或用户不存在！"});
            // console.log("账号密码错误或用户不存在！");  
            res.status(200).json({status: false, msg: "User verified"}); 
        }
        else{
            req.session.user=docs[0]._doc.admin;
            // console.log('登录成功！');
            res.status(200).json({status: true, msg: "登录成功！"});
            // if(docs[0]._doc.admin==false){
            //     res.sendFile('public/main.html', {"root": __dirname}); 
            // }
            // else{
            //     res.sendFile('public/admin/dashboard.html', {"root": __dirname}); 
            // }           
        }
    })  
})

app.post("/admin/add-book",function(req,res){
    //console.log(req)
    const book1 = new Book({ author:req.body.author,place:req.body.place,publisher:req.body.publisher,price:req.body.price,title:req.body.title});
    book1.save()
    res.status(200).send({status: true, msg: "添加成功！"});   
})
app.get("/get-books", function(req, res) {
    Book.find().then(function(data) {
        res.status(200).send({status: true, msg: "Books on the way!", books: data});
    })
  })
app.listen(10232)