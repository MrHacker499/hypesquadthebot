const Discord = require('discord.js');
const got = require('got');

exports.run = async (bot, message, args) => {
    const server = message.content.split(" ").slice(1).join(" ")
    if (!server) {
        var embed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(":x: **|** You did not include any __Arguments__")
        message.channel.send({ embed: embed })
    }
    const url = await got(`https://api.mcsrvstat.us/1/${server}`, {json: true})
    if (url.body.ip === "") {
        var embed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(":x: **|** That is __Not__ a valid IP")
        message.channel.send({ embed: embed })
    }
    var embed = new Discord.RichEmbed()
    .setDescription(`Information on **${server}**`)
    .setColor("#52bcf5")
    .setThumbnail("https://cdn.worldvectorlogo.com/logos/minecraft-1.svg")
    .setTimestamp()
    .addField(":computer: Real IP Adress :computer:", `**__${url.body.ip}__**`)
    .addField(":computer: Port :computer:", `**__${url.body.port}__**`)
    message.channel.send({ embed: embed })
}

exports.help = {
    name: "mcstats",
    description: "Gets stats on a Minecraft User",
    usage: "pr!mcstats [Server IP]",
    note: "It may be offline!"
}
