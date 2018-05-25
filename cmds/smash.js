const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  const user = message.mentions.users.first();
  if (!user) {
    var embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(":x: **|** You did not include a mention, please do so.")
    message.channel.send({ embed: embed })
  }
  
  if (user.id === message.author.id) return message.channel.send("Why would you want to SMASH yourself?")
  if (user.id === bot.user.id) return message.channel.send("I dont think you would want to SMASH a bot...")
  message.channel.send(new Discord.Attachment("https://media.giphy.com/media/fCGvE4lCoY8fu/200.gif", "smash.gif"))
  message.channel.send(`**SMASSSH**\n**__${message.author.username}__** SMASHED **__${user.username}__**!`)
}

exports.help = {
  name: "smash",
  description: "Smash Somebody!",
  usage: "pr!smash [user]",
  note: "From Earthbound (You probably never heard of it!)"
}