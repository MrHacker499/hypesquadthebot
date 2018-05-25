const encode = require("strict-uri-encode");

exports.run = async (bot, message, args) => {
    let question = encode(args.join(' '));
    
    let link = `https://www.lmgtfy.com/?q=${question}`;
    
    message.channel.send(`**<${link}>**`)
}

exports.help = {
    name: "lmgtfy",
    description: "lmgtfy what else is there to know?",
    usage: "pr!lmgtfy <question>",
    note: "I don't really know"
}