
exports.run = (bot, message, args) => {
    let channels = message.guild.channels.filter(m => m.type === 'voice').map(vc => vc).slice(1).join(" ❱ ")
    if (!channels) channels = "None";
    
    message.channel.send({
            embed: {
                color: 0x503d82,
                description: `The following Voice Channels that are on **${message.guild.name}** are as follows:\n\n${channels.length > 1024 ? "\'The roles list is too long to list.\'" : channels}\n \u200B`
            }
        })
}

exports.help = {
    name: "vchannels",
    description: "Lists all the voice channels!",
    usage: "pr!vchannels",
    note: "There may be none!"
}