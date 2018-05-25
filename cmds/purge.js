const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send("You need the permission **MANAGE_MESSAGES** to use this command!")
    }
    if (isNaN(args[0])) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Missing `<number>` argument."
            }
        })
        
    if (args[0] > 100) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Please supply a number less than 100."
            }
        });
        
    message.channel.bulkDelete(args[0])
        .then( messages => message.channel.send({
            embed: {
                title: "SUCCESS!",
                color: 0x20db27,
                description: `I have deleted **${args[0]}** messages.`
            }
        }).then( msg => msg.delete({ timeout: 10000 })));
    
}

exports.help = {
    name: "purge",
    description: "Clears Messages",
    usage: "pr!purge <number>",
    note: "Woah"
}