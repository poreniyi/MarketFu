const express=require('express');
const app=express();
const port=3000;
const path=require('path');
// const fetch=require('';)
app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');
app.get('/',(req,res)=>{
    console.log(`Home page visited`);
    res.send();
})
app.get('/ot',(req,res)=>{

})

app.listen(port,()=>{
    console.log(`Now listening at port ${port}`);
})