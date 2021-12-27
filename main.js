const express=require('express')
const mongoose = require('mongoose');
const app = express();
const ejs=require('ejs')

//mongoose.connect('mongodb://172.21.2.236:27017/190110910232');

app.use('/',express.static('public'))

app.listen(10232)