const Discord = require('discord.js');
const prefixes = require('../Storage/prefixes.json');
const fs = require("fs");

exports.run = (bot, message, args) => {
    const prefix = prefixes[message.guild.id].prefix;
     if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "262410813254402048" &&  message.author.id !== "265279363199533068") return message.channel.send(`__**Access Denied**__\nYou must have __MANAGE_GUILD__ perms to use this command.`); 
    if (!args) return message.channel.send("You did not set a prefix! Please do!");
    prefixes[message.guild.id].prefix = `${args}`

    message.channel.send(`The new prefix for ${message.guild.name} is now ${args}!!!`)
}

exports.help = {
    name: "setprefix",
    description: "Sets the prefix of the server",
    usage: `pr!setprefix [prefix]`,
    note: "Only people with the permission MANAGE_GUILD can use this!"
}