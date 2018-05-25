const Discord = require('discord.js');
const funnyWords = require('funny-words');

exports.run = (bot, message) => {
    let args = message.content.split(' ').slice(1).join(" ");
    
    if (!args) return message.channel.send("Put something you want to jumble!")
    message.channel.send(funnyWords(args))
}

exports.help = {
    name: "jumble",
    description: "Jumbles up a word/sentence!",
    usage: "pr!jumble [args]",
    note: "Sometimes doesn't jumble correctly!"
}