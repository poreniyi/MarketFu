const config = require("./config.json");
const Discord=require('discord.js');
const fs=require('fs');
const client = new Discord.Client();
client.login(config.BOT_TOKEN);
client.commands= new Discord.Collection();
const commandFiles=fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));
client.on(`ready`,()=>{
    console.log(`Bot logged in and ready for use`);
})

const prefix='!';

for (const file of commandFiles){
    const command=require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message',(message)=>{
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix))return;  
    if(message.channel instanceof Discord.DMChannel)return;
    else{
        const commandBody=message.content.slice(prefix.length);
        const args=commandBody.trim().split(/ +/);
        const command =args.shift().toLocaleLowerCase();
        try{
            client.commands.get(command).execute(message,args);
        }catch(err){
            console.log(err);
            message.reply(`ther was an error trying to execute that command!`);
        }
    }
});
