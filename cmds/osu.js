const osu = require("node-osu");
const osuApi = new osu.Api(process.env.OSU_API_KEY);

exports.run = async (bot, message, args) => {
    function numberWithCommas(x) {
        const parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    osuApi.getUser({u: args.join(" ")}).then(user => {
        const pais = user.country;
        message.channel.startTyping();
        message.channel.send({embed:{
            color: 0x46be30,
            author: {
                name: user.name + " profile",
                icon_url: "https://a.ppy.sh/"+user.id
            },
            fields: [
                {
                    name: "Global Ranking",
                    value: "#"+user.pp.rank,
                    inline: true
                },{
                    name: "Local Ranking",
                    value: "#"+user.pp.countryRank+" :flag_"+pais.toLowerCase()+":",
                    inline: true
                },{
                    name: "Performance Points",
                    value: Math.round(user.pp.raw)+"pp",
                    inline: true
                },{
                    name: "Ranks",
                    value: ":regional_indicator_s::regional_indicator_s: "+user.counts.SS+" :regional_indicator_s: "+user.counts.S+" :regional_indicator_a: "+user.counts.A,
                    inline: true
                },{
                    name: "Ranked Points",
                    value: numberWithCommas(user.scores.ranked),
                    inline: true
                },{
                    name: "Total Points",
                    value: numberWithCommas(user.scores.total),
                    inline: true
                },{
                    name: "Level",
                    value: Math.round(user.level),
                    inline: true
                },{
                    name: "Play Counts",
                    value: user.counts.plays,
                    inline: true
                },{
                    name: "Aim",
                    value: user.accuracyFormatted,
                    inline: true
                }
            ],
            footer: {
                icon_url: message.author.avatarURL,
                text: `${message.author.tag}`
            },
            thumbnail: {
                url: "https://a.ppy.sh/"+user.id
            }
        }});
        message.channel.stopTyping();
        
    });
    
}

exports.help = {
    name: "osu",
    description: "Gives information about a specificed userID in OSU",
    usage: "pr!osu <userID>",
    note: "Sometimes Buggy"
}