const _discord = require("discord.js");
const fs = require("fs");

exports.run = async(bot, message, args) => {
    if (message.channel.type === "dm") return;  // I found the problem I put sender.id so it would be message.author.id.id   
    const economy = require("../economy.json") // then ill just call them?                 sure
    
    let sender = message.author.id;
    
    if (bot.user.id === message.author.id) { return }
    
    if (!economy[sender + message.guild.id].money) {
        const embed = new _discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Bank", message.author.avatarURL)
    .addField("Balance:", "No Money!", true)
    .setTimestamp();
    
    message.channel.send({embed: embed});
    }
    
    const embed = new _discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Bank", message.author.avatarURL)
    .addField("Balance:", economy[sender + message.guild.id].money, true)
    .setTimestamp();
    
    message.channel.send({embed: embed});
    
} 

exports.help = {
    name: "balance",
    description: "Shows your balance",
    usage: "pr!balance",
    note: "If you have no money, ~~you are not special~~"
};
