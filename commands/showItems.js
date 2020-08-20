const Discord=require('discord.js');
const fs=require('fs');
const path=require('path');

 getData=require('../expressApp/fetch.js').getData;

showItems=async(message,args)=>{
    let data=getData(200);
    let embedItemList= makeEmbed();
     message.channel.send({embed:embedItemList}).then(msg=>{
        msg.react('◀️');
        msg.react('▶️'); 
        const filter=(reaction,user)=>{
            return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
        }
        console.log(`show items triggered`);
        const collector=msg.createReactionCollector(filter,{time:60000});
       let page=1;
        collector.on('collect', async (reaction,user)=>{
            console.log(`User ${user.tag} reacted`);
            if(reaction.emoji.name=='◀️') page--;
            else page ++;
            // if (page==1||page==data.length)return;
          
            embedItemList.Footer=`Page ${page} of many`;
            embedItemList.fields=[  {
            name: 'Nw',
            value: 'SBRRAND NEW VALUE',
        },];
        console.log(embedItemList.fields);
        let embed2=await makeEmbed2();
        console.log(embed2);
           msg.edit(embed2);
        })
    })
}

makeEmbed=()=>{
    let embed={
        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },
        ],
        timestamp: new Date(),
        description:`Page 1 of many`,
        Footer: `${1}`,
    }
    return embed;
}

makeEmbed2=async()=>{
    const baseEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setDescription('Some description here')
	.setTimestamp()
    items=await getItems();
    console.log(items);
    itemEmbed=addItemsToField(baseEmbed,items);
    return itemEmbed;
}
getItems=async()=>{
    let file=path.join(__dirname,'..','expressApp','example.txt');
    lvl=200-14;
    let data=await fs.promises.readFile(file,'utf8');
    let parsedData=JSON.parse(data);
    const lvlFilter=(items)=>{
        return lvl<=items.LVL;
    }
    filteredItems=parsedData.items.filter(lvlFilter);
    return filteredItems;
}
addItemsToField=(embed,items)=>{
      items.forEach(element=>{
          let price=element.price.toString();
          let name=element.name.toString();
          embed.addField(`Item Name:${name}`,`Price: ${price}`,false);
      })
      return embed;
}
module.exports={
    name:'showitems',
    description:'showitems',
    execute(message,args){
       showItems(message,args);
    }
}

