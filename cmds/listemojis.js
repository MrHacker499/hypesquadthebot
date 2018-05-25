exports.run = (bot, message) => {
	  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  if (!emojiList) return message.reply("There are no emoji's in this server!")
message.channel.send(emojiList);
}

exports.help = {
name: "listemojis",
description: "Lists all the emojis in the server",
usage: "pr!listemojis",
note: "If there are no emojis, then it will tell you so"
}
