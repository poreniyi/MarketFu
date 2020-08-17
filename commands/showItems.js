const embedd = require('./embedd.js');


 getData=require('../expressApp/fetch.js').getData;

showItems=async(message,args)=>{
    let data=getData(200);
    let embed= makeEmbed();
    let themessage= await message.channel.send({embed:embed});
    themessage.react('◀️');
    themessage.react('▶️');

    const filter=(reaction,user)=>{
        //return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
        return reaction.emoji.name=='◀️' && user.id === message.author.id;

    }
    console.log(`show items triggered`);
    const collector=message.createReactionCollector(filter,{time:60000});
   let page=1;

    collector.on('collect',(reaction,user)=>{
        console.log(`User ${user.tag} reacted`);
        if (page==1||page==pages.length)return;
       if(reaction.emoji.name=='◀️') page--;
       else page ++;
       embed.footer=`Page ${page} of many`;
       embed.fields=[];
       message.edit(embed);

    })

}

makeEmbed=()=>{
    let embed={
        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
        ],
        timestamp: new Date(),
        description:`Page 1 of many`,
        Footer: `${1}`,
    }
    return embed;
}

module.exports={
    name:'showitems',
    description:'showitems',
    execute(message,args){
       showItems(message,args);
    }
}

