
var express=require('express');
var path=require('path');
var database=require('./database_con');
var cors=require('cors');
var bodyparser=require('body-parser');
var app=express();

var urlencodedParser=bodyparser.urlencoded({extended:false});

app.use(express.static(path.join(__dirname,'../','client')));
app.get("/",(request,response)=>{
    response.sendFile(__dirname+"/index.html");
});

 var corsOptions={
     origin:'*',
     optionsSuccessStatus: 200
 };
 app.post("/deposit",urlencodedParser,cors(corsOptions),(request,response)=>{
    let qname=request.body.name;
    let qnumber=request.body.number
    let qbalance=request.body.balance;
    database.deposit(qname,qnumber,qbalance,request,response);
 });
 app.post("/withdraw",urlencodedParser,cors(corsOptions),(request,response)=>{
    let qname=request.body.name;
    let qnumber=request.body.number
    let qbalance=request.body.balance;
    database.withdraw(qname,qnumber,qbalance,request,response);
 });
 app.post("/balance",urlencodedParser,cors(corsOptions),(request,response)=>{
    let qnumber=request.body.number
    database.getCurrentBalance(qnumber,request,response);
 });
 app.post("/createCustomer",urlencodedParser,cors(corsOptions),(request,response)=>{
    let qname=request.body.name;
    let qnumber=request.body.number
    let qbalance=request.body.balance;
    database.createNewAccount(qname,qnumber,qbalance,request,response);
 });
 
app.listen(5000,()=>{
    console.log('server is running');
});