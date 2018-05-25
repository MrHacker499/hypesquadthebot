const b = require('../Storage/blacklist.json');
const Discord = require('discord.js');
const fs = require('fs');

exports.run = (bot, message, args) => {
    if (!message.author.id === "262410813254402048" && !message.author.id === "396027480097554432") return message.channel.send("You are not one of my developers!")
    const args2 = message.content.split(" ").slice(1).join(" ")
    try {
    const user = bot.users.get(args2)
    const list = bot.users.map(u => u.id)
    if (!list.includes(user.id)){
     message.channel.send("Please put in a valid user id!")
     return;
    }
    if (!b[user.id]) b[user.id] = {};
    if (!b[user.id].blacklisted) b[user.id].blacklisted = "True";
         fs.writeFile('./Storage/blacklist.json', JSON.stringify(b), (err) => {
if (err) console.error(err)
});
message.channel.send(`User ${user.username} is now blacklisted!`)
user.send(`Hello ${user.username}, I am here because you are blacklisted from using my google command!`)
    } catch (err) {
        message.channel.send(`Oops! I dont think that user is valid! \n**${err.stack}**`)
    }
}

exports.help = {
    name: "gblacklist",
    description: "Blacklists someone from using the Google command",
    usage: "pr!gblacklist [User ID]",
    note: "Only my developers can use this!"
}