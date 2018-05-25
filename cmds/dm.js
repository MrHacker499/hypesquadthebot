const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    const DMatron = args.join(" ")
    if (!DMatron) return message.channel.send("**ERROR**\nYou did not include something you would like to DM me, please do!")
    message.author.send(DMatron)
}

exports.help = {
    name: "dm",
    description: "DM's you something you desire!",
    usage: "pr!dm [args]",
    note: "You can trick your friends!"
}