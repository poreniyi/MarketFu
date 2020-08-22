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

makeDummyData=async()=>{
    let file=path.join(__dirname,"example.txt");
    let exampleWriter=fs.createWriteStream(file,'utf8');
 
    let items=[
        {
            name:Item,
            price:200,
            LVL:198,
        },
    ]
    let obj={
        items:items,
    }
    let writeData=JSON.stringify(obj);
    //exampleWriter.write(writeData);
}
//makeDummyData();

addDummyData=async()=>{
    let file=path.join(__dirname,"example.txt");
    let exampleWriter=fs.createWriteStream(file,{flags:'a',encoding:'utf8'});
    let oldData=await fs.promises.readFile(file,'utf8');
    let parsedOldData=JSON.parse(await fs.promises.readFile(file,'utf8'));
    let newStuff=[
        {
            name:Item,
            price:200,
            LVL:198,
        },
    ]
    console.log(parsedOldData);
    
}
//addDummyData();
module.exports={
    getItemData:getData,
}