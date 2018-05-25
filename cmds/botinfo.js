const Discord = require("discord.js");
const moment = require("moment");
const _fs = require("fs");
const package = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));
require("moment-duration-format");

exports.run = async(bot, message, args) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
	const cpu = process.cpuUsage().system / 1024 / 1024;
    
    const embed = new Discord.RichEmbed()
    .setTitle(`Info about ${bot.user.tag}`)
	.setThumbnail(message.author.displayAvatarURL)
	.setColor("RANDOM")
	.addField(":regional_indicator_m: Memory usage :regional_indicator_m:", `***>***__${Math.round(used * 100) / 100} MB__`, true)
	.addField("CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
	.addField("Node Version", `${package.engines.node}`, true)
	.addField("Bot Authors", `${package.author}`, true)
	.addField("Bot Version", `${package.version}`, true)
	.addField("Commands", bot.commands.size, true)
	.addField("Uptime", moment.duration(bot.uptime/1000, "seconds").format("d [D], h [Hrs], m [Mins], s [Secs]"), true)
	.addField("Servers in", `${bot.guilds.size}`, true)
	.addField("Total Users", `${bot.users.size}`, true)
	.addField("Total Channels", `${bot.channels.size}`, true)
	message.channel.send({ embed: embed })
}


exports.help = {
    name: "botinfo",
    description: "Provides information about the bot",
    usage: "pr!botinfo",
    note: "Information about me!"
}