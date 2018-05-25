const Discord = require("discord.js");
const _fs = require("fs");
const package = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));
const config = JSON.parse(_fs.readFileSync('./Storage/settings.json', 'utf-8'));

exports.run = async(bot, message, args) => {
    
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
				 
				 const user = message.mentions.users.first();
				 
				 // If no @user
				 var embed2 = new Discord.RichEmbed()
				 .setAuthor("Avatar - " + config.handles.title, config.handles.icon_url)
				 .addField("Username:", `${message.author.tag}`, true)
				 .addField("Your Avatar:", message.author.avatarURL)
				 .setColor(randomColor)
				 .setThumbnail(`${message.author.displayAvatarURL}`)
				 .setTimestamp()
				 .setFooter(`Developed by ${package.author} - Version ${package.version}`, config.handles.icon_url)
				 if(!user) message.channel.send(embed2);
				 // if @user
				 else {
				 	var embed = new Discord.RichEmbed()
				.setAuthor("Avatar - " + config.handles.title, config.handles.icon_url)
				.addField("Username:", user.tag, true)
				.addField("Avatar URL:", user.displayAvatarURL, true)
				.setColor(0x00AE86)
				.setThumbnail(`${user.displayAvatarURL}`)
				.setTimestamp()
				.setFooter(`Developed by ${package.author} - Version ${package.version}`, config.handles.icon_url);
				message.channel.send(embed)
			 }
}

exports.help = {
    name: "avatar",
    description: "Gives either your avatar or the person you mentioned avatar",
    usage: "pr!avatar [user]",
    note: "Makes it easy to steal someones avatar 😉"
}