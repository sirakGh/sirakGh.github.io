var mysql=require('mysql');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"bank",
});

con.connect((err)=>{
    if(err) throw err;
    console.log('database connected');
});

//get the current balance
exports.getCurrentBalance=(value,request,response)=>{
    let sqlstr=`SELECT * FROM accounts WHERE number=${value}`;
    con.query(sqlstr, function (err,result){
        if(err) throw err  
        console.log(result[0].balance);
        response.json(result);    
    });
};
function selectCustomer(value,request,response,fn){
   // let inval=mysql.escape(value);
    var res;
    console.log(value);
    let sqlstr=`SELECT * FROM accounts WHERE number=${value}`;
    con.query(sqlstr, function (err,result){
        if(err) throw err  
        //response.json(result);
        console.log(result[0].balance);
      // res=result[0].balance;
        fn(result[0].balance);
        });
    //return res;
}

//create new account

exports.createNewAccount=(qname,qnumber,qbalance,request,response)=>{
    let inval1=mysql.escape(qname);
    let inval2=mysql.escape(qnumber);
    let inval3=mysql.escape(qbalance);
    let sqlstr=`INSERT INTO accounts (name, number,balance) VALUES (${inval1},${inval2},${inval3})`;
    con.query(sqlstr,(err,result)=>{
        if(err) throw err;
        response.json({
            success:true,
            message:"user created successfully",
            uname:qname,
            number:inval2,
            ubalance:qbalance

        });
    });
}


//this is withdraw
 exports.withdraw=(qname,qnumber,qbalance,request,response)=>{
    let inval1=mysql.escape(qname);
    let inval2=mysql.escape(qnumber);
   let inval3=qbalance;
    selectCustomer(inval2,request,response, (balance)=>{
        console.log(balance)
        console.log(inval3);
        console.log(`inval3  ${typeof(inval3)}`);
        console.log(parseInt(inval3));
       console.log(`inval3  ${typeof(inval3)}`);
       console.log(inval3);
   
       if (inval3>balance){
           response.json({
               success:false,
               message:"not a valid amount"
           })
       }
       let newbalance=(balance-inval3);
    let sqlstr=`UPDATE accounts SET balance = ${newbalance} WHERE name=${inval1}`;
    con.query(sqlstr,(err,result)=>{
        if(err) throw err;
        response.json({
            success:true,
            message:"user created successfully",
            newbalance:newbalance,
            inval:inval3
        });
    });
    });
    
}

//deposit
exports.deposit=(qname,qnumber,qbalance,request,response)=>{
    let inval1=mysql.escape(qname);
    let inval2=mysql.escape(qnumber);
   let inval3=qbalance;
    selectCustomer(inval2,request,response, (balance)=>{
   
       if (inval3<0){
           response.json({
               success:false,
               message:"not a valid amount"
           })
       }
       let newbalance=(balance+parseInt(inval3));
       console.log(newbalance);
    let sqlstr=`UPDATE accounts SET balance = ${newbalance} WHERE name=${inval1}`;
    con.query(sqlstr,(err,result)=>{
        if(err) throw err;
        response.json({
            success:true,
            message:"deposited sucessfuly"
        });
    });
    });
    
}