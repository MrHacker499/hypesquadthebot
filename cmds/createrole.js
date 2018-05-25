const Discord = require('discord.js');

exports.run = (bot, message) => {
if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to create roles!");
const name = message.content.split(' ').slice(1).join(' ');
if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("I do not have permission to create roles!");
message.guild.createRole({
name: `${name}`
})
message.channel.send(`Created role ${name}!`)
}

exports.help = {
name: "createrole",
description: "Creates the role in the server",
usage: "pr!createrole [role name]",
note: 'You need "MANAGE_ROLES" permissions to use this command'
}
