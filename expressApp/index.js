const express=require('express');
const app=express();
const port=3000;
const path=require('path');
let assetPath=path.join(__dirname, './assets');
console.log(assetPath);
app.use('/assets',express.static(assetPath));
// const fetch=require('';)
app.set('views', path.join(__dirname,'./views'));
app.set('view engine','ejs');



app.get('/',(req,res)=>{
    console.log(`Home page visited`);
    res.render("MarketFu");
})
app.get('/getItems',async (req,res)=>{
    const getItemData=require('./fetch.js').getItemData;
    let items=await getItemData(1);
    console.log('getItems triggered',items);
    res.send(items);
})

app.listen(port,()=>{
    console.log(`Now listening at port ${port}`);
})