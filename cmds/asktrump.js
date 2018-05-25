const Discord = require("discord.js");
const _fs = require("fs");
const package = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));
const config = JSON.parse(_fs.readFileSync('./Storage/settings.json', 'utf-8'));

exports.run = async(bot, message, args) => {
    
    var trump = require("react-trump");
    let question = args.join(' ');
    var exclamationPoints = 2;
    var includeQuestion = false;
    var answer = trump.answer({ question, exclamationPoints, includeQuestion });
    
    const embed = new Discord.RichEmbed()
			.setTitle("Trump Answers!")
			.setAuthor(config.handles.title)
			.setColor(0x00AE86)
			.addField("Question:", `**${question}**`)
			.addField("Answer:", `**${answer}**`)
			.setFooter(`Developed by ${package.author} - Version ${package.version}`, config.handles.icon_url)
			message.channel.send({embed});
    
    
}


exports.help = {
    name: "asktrump",
    description: "Asks a question to our very dear president",
    usage: "pr!asktrump <question>",
    note: "Trump isn't much of a talker"
}