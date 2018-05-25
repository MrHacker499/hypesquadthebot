exports.run = (bot, message) => {
	const args = message.content.split(' ').slice(1)
	    if (args.length < 1) {
        message.channel.send('You must input text to be reversed!');
    }
    message.channel.send(args.join(' ').split('').reverse().join(''));
}

exports.help = {
name: "reverse",
description: "Reverses text",
usage: "pr!reverse [text]",
note: "The font may look different, and markdown might ruin it"
}
