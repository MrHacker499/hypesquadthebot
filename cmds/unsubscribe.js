const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("**Error**\nYou do not have the ***MANAGE_SERVER*** Permissions, if you believe this is an error, please contact mods!")
    db.updateText(`newsChannel_${message.guild.id}_`, '')
    var embed = new Discord.RichEmbed()
    .setTitle("Unsubscribed :white_check_mark:")
    .setColor("GREEN")
    .setThumbnail("http://www.emoji.co.uk/files/emoji-one/symbols-emoji-one/2118-white-heavy-check-mark.png")
    .setDescription("You unsubscribed to `Prism-News`! Hopefully you will subscribe again to get the latest news!")
    message.channel.send({ embed: embed })
}

exports.help = {
    name: "unsubscribe",
    description: "Unsubscribes from Prism-News",
    usage: "pr!unsubscribe",
    note: "Hopefully you will come back soon!"
}
