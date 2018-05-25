const cowsays = require("cowsay");

exports.run = async (bot, message) => {
    var args = message.content.split(' ').slice(1).join(' ');
    if (!args) {
        return message.channel.send("What do you want the cow to say?");
    }

    message.channel.send(cowsays.say({
        text: args,
        e: 'oO'
    }), {code: 'css'});
    
}

exports.help = {
    name: "cowsay",
    description: "Let the cow say something!",
    usage: "pr!cowsay <What-The-Cow-Should-Say>",
    note: "MOOO!"
}