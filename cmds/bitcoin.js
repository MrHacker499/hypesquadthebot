const snekfetch = require("snekfetch");

exports.run = async (bot, message, args) => {
    snekfetch.get("https://blockchain.info/ticker").then((body) => {
        message.channel.send({
            embed: {
                title: "Bitcoin Worth",
                description: "Each of the values is the worth of a Bitcoin that it's worth in different countries.",
                color: 3066993,
                fields: Object.keys(body.body).map((c) => {
                    return {
                        name: c,
                        value: "**Buy Price**: " + body.body[c].symbol + body.body[c].buy + "\n**Sell Value**: " + body.body[c].symbol + body.body[c].sell,
                        inline: true
                    }
                })
            }
        })
    }).catch((error) => {
        message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "An unexpected error occured while grabbing Bitcoin prices."
            }
        })
        console.error("Failed to get Bitcoin Information", error.message)
        
    })
    
}

exports.help = {
    name: "bitcoin",
    description: "Shows bitcoin prices",
    usage: "pr!bitcoin",
    note: "Pricey!!"
}