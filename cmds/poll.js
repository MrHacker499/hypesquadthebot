const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    const questions = message.content.split(' ').slice(1).join(' ');
    if (!questions) return message.channel.send("Don't leave it blank cmon?");
    if (!message.content.includes("|")) {
        message.channel.send("You need to have a **|** for me to work the command!");
        return;
    }
    
    const choiceOne = message.content.substring(8, message.content.indexOf(" | "));
    const choiceTwo = message.content.split('|').slice(1).join(" ");
    
    let firstChoice = choiceOne;
    let secondChoice = choiceTwo;
    
    if (questions.length < 2) {
        return message.channel.send("Mind actually using the correct format of the command? Use pr!help poll for the format");
    }
    
    if (!firstChoice) {
        return message.channel.send("There is no first choice!");
    }
    
    if (!secondChoice) {
        return message.channel.send("There is no second choice!");
    }
    
    if (questions[0].includes("|")) {
        return message.channel.send("There is no first choice!");
    }
    
    const embed = new Discord.RichEmbed()
    .setColor("#503d82")
    .setFooter(message.author.tag, message.author.avatarURL)
    .addField("1st Choice", firstChoice, true)
    .addField("2nd Choice", secondChoice, true)
    message.channel.send({embed: embed})
    .then(msg => {
        msg.react('🥇')  
        .then(msg.react("🥈"));
        
    });

    
}

exports.help = {
    name: "poll",
    description: "Makes a poll for users to pick on",
    usage: "pr!poll <1stChoice> | <2ndChoice>",
    note: "Take note of the bots reaction"
}