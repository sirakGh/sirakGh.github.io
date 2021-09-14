$(()=>{
   $('#loader').hide();
   var operation;
 $('#btn').on('click',(event)=>{
    event.preventDefault();
     let inname=document.getElementById('name').value;
     let innumber=document.getElementById('number').value;
     let inbalance=document.getElementById('balance').value;
    let operation=document.getElementById('operation');
      let val=operation.value;
     
    if(val=='deposit'){
      $.post("http://localhost:5000/deposit",{name:inname,number:innumber,balance:inbalance})
      .done((data)=>{
         showResult(data);
      }).fail((err)=>{
          console.log('error occured'+err);
      })
      .always(()=>{
         $('#loader').hide();
      });  
 }
 else if(val=='withdraw'){
   $.post("http://localhost:5000/withdraw",{name:inname,number:innumber,balance:inbalance})
   .done((data)=>{
      showWithDrawResult(data);
   }).fail((err)=>{
       console.log('error occured'+err);
   })
   .always(()=>{
      $('#loader').hide();
   });  
}
else if(val=='balance'){
   $.post("http://localhost:5000/balance",{number:innumber})
   .done((data)=>{
      showbalance(data);
   }).fail((err)=>{
       console.log('error occured'+err);
   })
   .always(()=>{
      $('#loader').hide();
   });  
}
else {
   $.post("http://localhost:5000/createCustomer",{name:inname,number:innumber,balance:inbalance})
   .done((data)=>{
      createCustomer(data);
   }).fail((err)=>{
       console.log('error occured'+err);
   })
   .always(()=>{
      $('#loader').hide();
   });  
}
   $('#loader').show();
   $('#result').empty();
     
 });

 $('#loader').hide();
});

 showResult=(data)=>{
    if(data.success==true){
      alert('deposited');
    }else{
       alert('not inserted');
    }
    
}
showWithDrawResult=(data)=>{
   if(data.success==true){
      $('#result').append(`<p>you have successfuly withdrawn ${data.inval} and your current balance is ${data.newbalance} </p>`);
   }else{
      alert('not inserted');
   }
}
showbalance=(data)=>{
   $('#result').empty();
   $('#result').append(`<p>Your current balance is: ${data[0].balance}</p>`);
}
createCustomer=(data)=>{
   if(data.success==true){
      $('#result').append(`<p>New customer created! </p>`);
      $('#result').append(`<p>cutomer info: </p>`);
      $('#result').append(`<p>name: ${data.uname} </p>`);
      $('#result').append(`<p>number: ${data.number} </p>`);
      $('#result').append(`<p>balance: ${data.ubalance} </p>`);

   }else{
      alert('not inserted');
   }
}
