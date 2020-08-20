const getData=require('../expressApp/fetch.js').getData;
const fs=require('fs');
const path=require('path');
const https=require('https');



buy=(message,args)=>{
    getData();
    const filter=(reaction,user)=>{
        return reaction.emoji.name==='🛒' && user.id===message.author.id;
    }
    console.log(`buy command triggered`);
    const collector=message.createReactionCollector(filter,{time:15000});
    collector.on('collect',(reaction,user)=>{
        message.react('✅');
        console.log(`User ${user.tag} reacted with shoppingcart`);
    })

}


module.exports={
    name:'wtb',
    description:'WTB',
    execute(message,args){
       buy(message,args);
    }
}

buy=(message,args)=>{
    const filter=(reaction,user)=>{
        return reaction.emoji.name==='🛒' && user.id===message.author.id;
    }
    console.log(`buy command triggered`);
    const collector=message.createReactionCollector(filter,{time:15000});
    collector.on('collect',(reaction,user)=>{
        message.react('✅');
        console.log(`User ${user.tag} reacted with shoppingcart`);
    })
    if(message.attachments.size>0){
        saveImage(message.id,message.attachments);
    }
}


saveImage=(id,attachments)=>{
    attachments.forEach(element => {
        if(element.name.endsWith('.png')||element.name.endsWith('.jpg')){
            let end=element.name.endsWith('.png') ? '.png' : '.jpg';
            let filePath=path.join(__dirname,"..",'Images',`${id}.${end}`);
            let localPath=fs.createWriteStream(filePath);
            let request=https.get(element.url,(response)=>{
                response.pipe(localPath);
            })
        }
    });
}


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
