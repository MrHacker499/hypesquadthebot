// > Requirements
const Discord = require("discord.js");
const botsettings = require("./Storage/botsettings.json");
 // I'm just going off of my main.js and putting everything in here then we move ALL the commands we had into here
const key = process.env.YOUTUBE_API_KEY;
const fs = require("fs");
const colors = require('colors');
const moment = require('moment');
const yt = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(key);
const queue = new Map();
const snekfetch = require("snekfetch");
const prefixes = require("./Storage/prefixes.json")
const economy = require("./Storage/economy.json");
const db = require('quick.db');
const figlet = require('figlet');
// > Defining our client

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error((err));
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Do you mind making the commands first?".red);
        return;
    }
    
    console.log(`Loading ${jsfiles.length} commands!`.green);
    
    jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./cmds/${f}`)]
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`.green);
        bot.commands.set(props.help.name, props);
    });
});


bot.on("message", message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!prefixes[message.guild.id]) prefixes[message.guild.id] = {};
    if (!prefixes[message.guild.id].prefix) prefixes[message.guild.id].prefix = "pr!"
     fs.writeFile('./prefixes.json', JSON.stringify(prefixes), (err) => {
if (err) console.error(err)
});
if (!economy[message.author.id + message.guild.id]) economy[message.author.id + message.guild.id] = {};
if (!economy[message.author.id + message.guild.id].money) economy[message.author.id + message.guild.id].money = 500; 
if (!economy[message.author.id + message.guild.id].lastDaily) economy[message.author.id + message.guild.id].lastDaily = "No Daily";
     fs.writeFile('./economy.json', JSON.stringify(economy), (err) => {
if (err) console.error(err)
});
});

bot.on("guildCreate", guild => {
	bot.user.setGame(`Type pr!help for help! | in ${bot.guilds.size} servers! | Square & ThatMajesticGuy`);
  const channel = guild.channels.find('name', 'general');
  var embed = new Discord.RichEmbed()
  .setTitle("Hello! :wave:")
  .setColor("RANDOMCOLOR")
  .setThumbnail("https://cdn.discordapp.com/avatars/361516875349491713/650913e4553b345cee92ed4a045779e1.png?size=2048")
  .addField("Thank you for inviting me! Here is some information that you should know!", "Please read by the way!")
  .addField(":one:", "Use pr!help for any help you need!")
  .addField(":two:", "If you do not like the prefix > or any of your other bots have t	he same prefix, please do pr!setPrefix (your new prefix)")
  .addField(":three:", "If anything goes wrong, please do pr!report to report it!")
  .addField(":four:", "Please support our other bots: `Scrooge-Mc-Bot` and `Snoopy`!")
  .addField(`Thank you for adding ${bot.user.tag}`, "Have fun! :wink:")
  .addField("Join our Discord!: https://discord.gg/cvU9pen", "You can gain more in depth support and just have fun in that server!")
  if (!channel) return guild.owner.send({ embed: embed })
  channel.send({ embed: embed })
  
  const guildOwner = guild.owner.user.tag;
  
  const log = bot.channels.get("373584746074341387")
  var embed2 = new Discord.RichEmbed()
  .setTitle("Joined a server!")
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail("http://freevector.co/wp-content/uploads/2009/03/40358-add-people-interface-symbol-of-black-person-close-up-with-plus-sign-in-small-circle.png")
  .addField(`I have joined the server ${guild.name} owned by ${guildOwner}`, `Now bringing ${bot.guilds.size} servers with ${bot.users.size} users in total`)
  log.send({ embed: embed2 })
});

bot.on("guildDelete", guild => {
	const guildOwner = guild.owner.user.tag;
	
	bot.user.setGame(`Type pr!help for help! | in ${bot.guilds.size} servers! | Square & ThatMajesticGuy`);
	 const log = bot.channels.get("373584746074341387")
	var embed = new Discord.RichEmbed()
	.setTitle("Banned/Kicked/Left a server!")
	.setColor("RANDOM")
	.setTimestamp()
	.setThumbnail("http://freevector.co/wp-content/uploads/2011/07/44911-user-with-minus-sign.png")
	.addField(`I have left the guild ${guild.name} owned by ${guildOwner}`, `I have decreased to ${bot.guilds.size} servers with ${bot.users.size} people.`)
	log.send({ embed: embed })
});

bot.on("emojiCreate", emoji => {
	const log = bot.channels.get("373584632379342869")
	var embed = new Discord.RichEmbed()
	.setTitle("New Emoji Created")
	.setThumbnail(`${emoji.url}`)
	.setColor("RANDOM")
	.setTimestamp()
	.addField(`${emoji.guild.name} has created a new emoji`, `${emoji}`)
		log.send({ embed: embed })
});

bot.on("emojiUpdate", emoji => {
	const log = bot.channels.get("373584632379342869")
	var embed = new Discord.RichEmbed()
	.setTitle("Updated Emoji")
	.setThumbnail(`${emoji.url}`)
	.setColor("RANDOM")
	.setTimestamp()
	.addField(`${emoji.guild.name} has updated a new emoji`, `${emoji}`)
		log.send({ embed: embed })
});

bot.on("messageDelete", message => {
	const log = bot.channels.get("373584277633499137")
    const guildOwner = message.guild.owner.user.tag;

	if(message.embeds.length == 1) {
	 var embed2 = new Discord.RichEmbed()
	.setTitle("Message Deleted")
	.setColor("RANDOM")
	.setTimestamp()
	.setThumbnail("https://images.homedepot-static.com/productImages/d97bfbf9-cf37-40d2-8fe2-6be3958eba6d/svn/rubbermaid-commercial-products-plastic-trash-cans-fg2643-60-gra-64_1000.jpg")
	.addField("Guild Owner", guildOwner)
	.addField("Guild Name", message.guild.name)
	.addField("Message Author", message.author.tag)
	.addField("Message Deleted", "Message was an **Embed**")
	log.send({ embed: embed2 })
	}

	var embed = new Discord.RichEmbed()
	.setTitle("Message Deleted")
	.setColor("RANDOM")
	.setTimestamp()
	.setThumbnail("https://images.homedepot-static.com/productImages/d97bfbf9-cf37-40d2-8fe2-6be3958eba6d/svn/rubbermaid-commercial-products-plastic-trash-cans-fg2643-60-gra-64_1000.jpg")
	.addField("Guild Owner", guildOwner)
	.addField("Guild Name", message.guild.name)
	.addField("Message Author", message.author.tag)
	.addField("Message Deleted", `It is ***${message.content}***`)
	log.send({ embed: embed })
});

bot.on("channelCreate", channel => {
	
	if (channel.type == 'dm') return;
	const log = bot.channels.get("373656598645702658")
	var embed = new Discord.RichEmbed()
	.setTitle("Channel Created!")
	.setColor("RANDOM")
	.setTimestamp()
	.addField(`Info on ${channel.name}:`, `It was created in ${channel.guild.name}`)
	log.send({ embed: embed })
});

bot.on("channelDelete", channel => {
	const log = bot.channels.get("373656619281678346")
	var embed = new Discord.RichEmbed()
	.setTitle("Channel Deleted!")
	.setColor("RANDOM")
	.setTimestamp()
	.setThumbnail(`${channel.guild.iconURL}`)
	.addField(`Info on ${channel.name}:`, `It was deleted in ${channel.guild.name}`)
	log.send({ embed: embed })
});

setTimeout(process.exit, 1000 * 60 * 60 * 168);

bot.on("ready", async (err) => {
    if(err) throw err;
    
    var textArray = [
		"Another day another startup!",
		`Now bringing ${bot.users.size} people joy!`,
		`Saying hi in ${bot.channels.size} channels!`,
		`Serving ${bot.guilds.size} servers!`,
		"Drinking a cup of coffee!",
		"I love my job only when I'm broken ;)",
		"hehexd"
		];
		var randomizer = Math.floor(Math.random()*textArray.length);
		
		bot.user.setGame(`Type pr!help for help! | in ${bot.guilds.size} servers! | Square & ThatMajesticGuy`);
	
	console.log("------------------------------------------------------")
	console.log(`${bot.user.tag}`)
	console.log(`Serving ${bot.users.size} people in ${bot.guilds.size} with a total of ${bot.channels.size} channels`)
	console.log(`${textArray[randomizer]}`)
	console.log("------------------------------------------------------")
	figlet.text('Prism', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
});
bot.on("message", async message => {
    if(message.author.bot) return;
    
     if(message.channel.type === "dm") {
        var embed = new Discord.RichEmbed()
        .setTitle("ERROR!")
        .setColor("RANDOM")
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .setTimestamp()
        .addField("ERROR!", "I currently don't work in DMs")
         message.channel.send({ embed: embed })
         return;
    }
    
    const prefix = prefixes[message.guild.id].prefix;
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
    if(cmd) cmd.run(bot, message, args, queue);
});

bot.on("message", message => {
	if (message.content.startsWith("pr!channel")) {
		    var embed = new Discord.RichEmbed()
    .setTitle("<:added:394910274177597491> Added Channel! <:added:394910274177597491>")
    .setColor("#3399ff")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL)
    .addField("A new channel has been __Created__ in **GUILD_NAME**", `It has been created on***${require('dateformat')(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT, Z")}***`)
    .addField("It was created by **CHANNEL_AUTHOR**", `We now have __**${bot.channels.size}**__ channels!`)
    message.channel.send({ embed: embed });
}
if (message.content.startsWith("pr!delete")) {
	var embed = new Discord.RichEmbed()
	.setTitle("<:removed:394913338888290307> Deleted Message! <:removed:394913338888290307>")
	.setColor("#ff4040")
	.setTimestamp()
	.setThumbnail(message.author.displayAvatarURL)
	.addField("A message has been __Deleted__ by __**MESSAGE_AUTHOR**__", `It has been deleted in ***GUILD_NAME***`)
	.addField(`It was deleted on __${require('dateformat')(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT, Z")}__`, "The Deleted message's server owner is **GUILD_OWNER**")
	message.channel.send({ embed: embed })
}
});
process.on('unhandledRejection', error => {
    console.log(`Unhandled Error Found! \n ${error.stack}`)
});




bot.login(process.env.BOT_TOKEN)