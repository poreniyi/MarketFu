const path=require('path');
const fs=require('fs');

//postData('./example.txt');

getData=async (lvl,price)=>{
    let file=path.join(__dirname,"example.txt");
    let data=await fs.promises.readFile(file,'utf8');
    let parsedData=JSON.parse(data);
    lvl-=14;
    console.log(lvl);
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

priceRegex=(string)=>{
    string=string.replace(/[.,]/gm,'');
    let result;
    let justNumbers=/\d+/;
    let millions=/\d+m|mk/;
    let thousands=/\d+k/;
    let thousandszK=/\d+kk/;
    if(millions.test(string)){
        console.log(`million at end`);
      result=1000000 * parseInt(string.match(millions)[0]);
    }else if (thousands.test(string)){
        console.log(`k at end`);
        result=1000 * parseInt(string.match(thousands)[0]);
    }else if(justNumbers.test(string)){
        result=parseInt(string);
    }
    result =result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    console.log(`${result} kamas`);

}
//priceRegex('1k');
