

exports.run = async (bot, message) => {
    let args = message.content.split(' ').slice(1);
    let messageToSay = args.join(" ");
    
    if(args.length < 1) {
        return message.channel.send("What do you want me to say?");
    }
    message.channel.send(messageToSay);
    
}

exports.help = {
    name: "say",
    description: "Says the specificed message",
    usage: "pr!say <message-to-say>",
    note: "Don't be rude!"
}