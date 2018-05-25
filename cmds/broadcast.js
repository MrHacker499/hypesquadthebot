const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (bot, message, args) => {
    if (message.author.id !== "262410813254402048" && message.author.id !== "396027480097554432") return;
    const args2 = message.content.split(" ").slice(1).join(" ");
    if (!args2) return message.channel.send("**Error**\nWhy would you want me to broadcast nothing?")
    message.channel.send(`I had sent **${args2}** to all the subscribers of \`Prism-News\`!`)
    const guilds = bot.guilds.map(g => g.id)
    if (!db.fetchObject(`newsChannel_${guilds}_`)) return;
     db.fetchObject(`newsChannel_${guilds}_`).then(i => {
    if (!i.text) return;
    const channel = bot.channels.get(i.text)
    
    
    var embed = new Discord.RichEmbed()
    .setTitle(":newspaper: Prism News! :newspaper:")
    .setColor("BLUE")
    .setThumbnail("http://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1981-rolled-up-newspaper.png")
    .setAuthor("Prism News", bot.user.displayAvatarURL)
    .setDescription(args2)
    channel.send({ embed: embed })
})
};

exports.help = {
    name: "broadcast",
    description: "Broadcasts News!",
    usage: "pr!broadcast [args]",
    note: "Only my developers can use this!"
}
