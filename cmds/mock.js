const mock = require("aids");

exports.run = async (bot, message, args) => {
    if (args.length > 0) {
        const text = mock(args.join(" "));
        message.channel.send(text)
    } else {
        message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Missing `<text>` argument."
            }
        })
    }
}

exports.help = {
    name: "mock",
    description: "Capitalizes every other word",
    usage: "pr!mock <text>",
    note: "Really rude"
}