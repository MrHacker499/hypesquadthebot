const Discord = require("discord.js");
const _fs = require("fs");
const package = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));
const config = JSON.parse(_fs.readFileSync('./Storage/settings.json', 'utf-8'));

exports.run = (bot, message, args) => {
		message.channel.send("Pinging...").then(m => {
			var lat_ms = (m.createdTimestamp - message.createdTimestamp);
			var api_ms = (Math.round(bot.ping));
			m.delete().then().catch(console.error);
			
			const embed = new Discord.RichEmbed()
			.setTitle("Pong!")
			.setAuthor(config.handles.title)
			.setColor(0x00AE86)
			.addField("Latency", lat_ms + "ms", true)
			.addField("API", api_ms + "ms", true)
			.setFooter(`Developed by ${package.author} - Version ${package.version}`, config.handles.icon_url)
			message.channel.send({embed});
		}).catch(console.error);
}

exports.help = {
    name: "ping",
    description: "Shows the bots ping!",
    usage: "pr!ping",
    note: "Do I need to tell you what it does?"
}