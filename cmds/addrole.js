const Discord = require('discord.js')

exports.run = (bot, message) => {
			const args = message.content.split(' ').slice(2).join(' ');
			var embed = new Discord.RichEmbed()
			.setTitle("Denied Acess :x:")
			.setColor(0xff3200)
			.setThumbnail("http://i0.kym-cdn.com/photos/images/newsfeed/001/234/765/971.gif")
			.addField("You are not permitted to use this command...", "If you do have the permission `MANAGE_ROLES_OR_PERMISSIONS` please contact the bot creators")
			    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send({ emebd: embed });
let member = message.mentions.members.first();
var embed2 = new Discord.RichEmbed()
.setTitle("No @Mention :x:")
.setColor(0xff3200)
.setThumbnail("http://i0.kym-cdn.com/photos/images/newsfeed/001/234/765/971.gif")
.addField("You did not mention anyone", "You need to mention someone for this command to work, you can do this by searching someone while typing @")
if (!member) return message.channel.send({ emebd: embed2 });
var embed3 = new Discord.RichEmbed()
.setTitle("No Role Specified :x:")
.setColor(0xff3200)
.setThumbnail("http://i0.kym-cdn.com/photos/images/newsfeed/001/234/765/971.gif")
.addField("You did not specify a role", "Or arguments apparently...") 
if (!args) return message.channel.send({ emebd: embed3 });
let myRole = message.guild.roles.find("name", `${args}`);
var embed4 = new Discord.RichEmbed()
.setTitle("Role does not exist :x:")
.setThumbnail("http://i0.kym-cdn.com/photos/images/newsfeed/001/234/765/971.gif")
.setColor(0xff3200)
.addField("That role does not exist!", "If it does, it ***__MUST__*** be case sensitive!")
if (!myRole) return message.channel.send({ emebd: embed4 });
var embed5 = new Discord.RichEmbed()
.setTitle("Insufficent Permissions for me")
.setColor(0xff3200)
.setThumbnail("https://www.viralviralvideos.com/wp-content/uploads/2017/06/Facepalm-GIF-2015.gif")
.addField("I do not have the correct permissions to add a role!", "Please change it... Please.... :pray: ")
     if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.send({ emebd: embed5 });
     var embed6 = new Discord.RichEmbed()
.setTitle("Added the role!")
.setTimestamp()
.setImage("https://media.giphy.com/media/l41lNm5py4150DOwg/giphy.gif")
.setColor(0x7bff00)
.addField(`Sucessfuly added ${member.user.username} the role ${args}!`, "Have fun!")
member.addRole(myRole).then(message.channel.send({ embed: embed6 }));
}

exports.help = {
	name: "Addrole",
	description: "Adds a role to a user!",
	usage: "pr!addrole [user] [role]",
	note: 'You need "MANAGE_ROLES" permissions to use this!'
}
