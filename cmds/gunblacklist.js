const Discord = require('discord.js');
const blacklist = require('../Storage/blacklist.json');

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
    if (!blacklist[user.id]) {
        message.channel.send("This user was not blacklisted in the first place...")
        return;
    }
    delete blacklist[user.id];
message.channel.send(`User ${user.username} is now unblacklisted from using the google command!`)
user.send(`Hello ${user.username}, I am here because you are ***unblacklisted*** from using my google command!`)
    } catch (err) {
        message.channel.send(`Oops! I dont think that user is valid! \n**${err.stack}**`)
    }
}

exports.help = {
    name: "gunblacklist",
    description: "Unblacklists a user from using the Google command",
    usage: "pr!gunblacklist [User ID]",
    note: "Only my developers can use this!"
};