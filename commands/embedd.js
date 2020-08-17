const Discord=require('discord.js');


module.exports={
    name:'embed',
    description:'embed!',
    execute(message,args){
        makeEmbed(message,args);
    }
}
let dummyData=[
    {name:'d', price:2},
    {name:'d', price:20},
    {name:'d', price:2},
    {name:'d', price:2},
    {name:'d', price:2},
    {name:'d', price:2},
]
const exampleEmbed = {
	color: 0x0099ff,
	title: 'Some title',
	url: 'https://discord.js.org',
	author: {
		name: 'Some name',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
		url: 'https://discord.js.org',
	},
	description: 'Some description here',
	thumbnail: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
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
	image: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
	timestamp: new Date(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
	},
};
makeEmbed=(message,args)=>{
    const exampleEmbeds= {	
    fields:[
    {name:'Item1',value:2, inline:false},
    {name:'Item2',value:2, inline:true},
    {name:'Item3',value:2},
    ],   
	timestamp: new Date(),
}
message.channel.send({embed:exampleEmbed});
}
