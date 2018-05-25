const Discord = require('discord.js');
const package = require('../package.json')

exports.run = (bot, message, args) => {
    

    const guilds = bot.guilds.map(g => g.id)
    const randomizer = Math.floor(Math.random()*guilds.length);
    const channel = bot.guilds.get(guilds[randomizer]).channels.filter(m => m.type === 'text').map(t => t.id).slice(1)
    const randomizer2 = Math.floor(Math.random()*channel.length);
        if (message.author.id !== "262410813254402048" && message.author.id !== "396027480097554432") {
        var embed = new Discord.RichEmbed()
        .setTitle("Restricted")
        .setColor("#FF0000")
        .setTimestamp()
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1024px-Flat_cross_icon.svg.png")
        .setFooter(`Bot made by ${package.author}`, new Discord.Client().user.displayAvatarURL)
        .addField(`Im sorry __${message.author.username}__...`, ":octagonal_sign: **You are not allowed to use this command...** :octagonal_sign:")
         message.channel.send({ embed: embed })
         return;
}
		message.channel.send({
            embed: {
                color: 0x503d82,
                description: "Invites list was sent to your DMs to avoid raiders :mailbox_with_mail:"
            }
        })
        bot.channels.get(channel[randomizer2]).createInvite().then(invite => {
        message.author.send(`Here is your invite from **${bot.guilds.get(guilds[randomizer])}**! \n${invite.url}`)
})}

exports.help = {
    name: "invites",
    description: "Gets the invites of all the servers the bot has!",
    usage: "pr!invites",
    note: "Only my Developers can use this!"
}