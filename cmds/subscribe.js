const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("**Error**\nYou do not have the ***MANAGE_SERVER*** Permissions, if you believe this is an error, please contact mods!")
    const channel = message.mentions.channels.first();
    if (!channel) return message.channel.send("**Error**\nYou did not include a channel mention, please mention a channel name to subscribe to Prism-News!")
    db.updateText(`newsChannel_${message.guild.id}_`, channel.id)
    var embed = new Discord.RichEmbed()
    .setTitle("Sucess :white_check_mark:")
    .setColor("GREEN")
    .setThumbnail("http://www.emoji.co.uk/files/emoji-one/symbols-emoji-one/2118-white-heavy-check-mark.png")
    .setDescription(`You have sucessfuly subscribed to \`Prism-News\`! Every time a major update or a bug fix happens, we will notify you in ${channel.name}! To unsubscribe, do \`pr!unsubscribe\`.`)
    message.channel.send({ embed: embed });
}

exports.help = {
    name: "subscribe",
    description: "Subscribe to Prism-News!",
    usage: "pr!subscribe [Channel Mention]",
    note: "You may want to subscribe because of the bugs!"
}
