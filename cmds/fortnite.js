const fortnite = require("fortnite");
const stats = new fortnite(process.env.FORTNITE_API_KEY);
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    let platform;
    let username;
    
    if (!['pc', 'xbl', 'psn'].includes(args[0])) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Please include the platform: **pr!fortnite [ pc | xbl | psn ] <username>**"
            }
        })
        
    if (!args[1]) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Please include the username: **pr!fortnite [ pc | xbl | psn ] <username>**"
            }
        })
        
        
    platform = args.shift();
    username = args.join(" ");
    
    
    stats.getInfo(username, platform).then( data => {
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Stats for ${data.username}`)
        .setDescription(`**Top Placement**\n\n**Top 3s:** *${data.lifetimeStats[0].value}*\n**Top 5s:** *${data.lifetimeStats[1].value}*\n**Top 6s:** *${data.lifetimeStats[3].value}*\n**Top 12s:** *${data.lifetimeStats[4].value}*\n**Top 25s:** *${data.lifetimeStats[5].value}*`, true)
        .setThumbnail("https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png")
        .addField('Total Score', data.lifetimeStats[6].value, true)
        .addField('Matches Played', data.lifetimeStats[7].value, true)
        .addField('Wins', data.lifetimeStats[8].value, true)
        .addField('Win Percentage', data.lifetimeStats[9].value, true)
        .addField('Kills', data.lifetimeStats[10].value, true)
        .addField('K/D Ratio', data.lifetimeStats[11].value, true)
        .addField('Kills Per Minute', data.lifetimeStats[12].value, true)
        .addField('Time Played', data.lifetimeStats[13].value, true)
        .addField('Average Survival Time', data.lifetimeStats[14].value, true)
        
        message.channel.send({embed: embed})
        
    }).catch (error => {
        message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: `The username **${username}** was not found with the platform **${platform}**`
            }
        })
    })
    
    
}

exports.help = {
    name: "fortnite",
    description: "Shows information about specificed Fortnite user",
    usage: "pr!fortnite [ pc | xbl | psn ] <username>",
    note: "Don't expose yourself if you're bad"
}