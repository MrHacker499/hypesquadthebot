

exports.run = async (bot, message) => {
    let args = message.content.split(' ').slice(1);
    let messageToSay = args.join(":clap:");
    
    if(args.length < 2) {
        return message.channel.send("Please state a complete sentence in");
    }
    message.channel.send(messageToSay);
    
}

exports.help = {
    name: "clap",
    description: "Says the specificed message but makes the messages into hands clapping!",
    usage: "pr!clap <message-to-clapify>",
    note: "Clap!"
}