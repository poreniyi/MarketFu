const path=require('path');
const fs=require('fs');

//postData('./example.txt');

getData=async (lvl,price)=>{
    let file=path.join(__dirname,"example.txt");
    let data=await fs.promises.readFile(file,'utf8');
    let parsedData=JSON.parse(data);
    lvl-=14;
    const lvlFilter=(items)=>{
        return lvl<=items.LVL;
    }
    const priceFilter=(items)=>{
        return items.price==price;
    }
    const priceLvlFilter=(items)=>{
        return items.price==price||lvl<=items.LVL;
    }
    let items=parsedData.items;
    let filteredItems=items.filter(priceLvlFilter);
    // console.log(filteredItems,filteredItems.length);
    return filteredItems;
}
// getData(200);
module.exports={
    getData:getData,
}

makeDummyData=()=>{
    let file=path.join(__dirname,"example.txt");
    let exampleWriter=fs.createWriteStream(file,'utf8');
    let items=[
        {
            name:1,
            price:200,
            LVL:126,
        },
        {
            name:1,
            price:200,
            LVL:138,
        },  {
            name:1,
            price:200,
            LVL:198,
        },  {
            name:1,
            price:200,
            LVL:198,
        },  {
            name:1,
            price:200,
            LVL:198,
        },  {
            name:1,
            price:200,
            LVL:198,
        },  {
            name:1,
            price:200,
            LVL:198,
        },
    ]
    let obj={
        items:items,
    }
    let writeData=JSON.stringify(obj);
    exampleWriter.write(writeData);
}
//makeDummyData();

module.exports={
    getItemData:getData,
}