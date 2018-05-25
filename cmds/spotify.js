const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    
    
    let user = message.mentions.users.first() || message.author;
    
    if (user.id === "369681763104194580" || user.id === "361516875349491713") return message.channel.send("Sadly I don't run Spotify yet :(")
    
    if (user.presence.activity !== null && user.presence.activity === 'LISTENING' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) {
    
    let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`; // This fetches a url image using the largeImage asset after slicing off the first 8 characters.
    let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`; // This grabs the syncID and adds it to the end of a spotify URL.
    let trackName = user.presence.activity.details;
    let trackAuthor = user.presence.activity.state;
    let trackAlbum = user.presence.activity.assets.largeText;
    
    
    const embed = new Discord.RichEmbed()
    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png') // This url will be in the description, it is setting the author & icon field for the embed.
      .setColor(0x1ED760) // This sets the color of the embed
      .setThumbnail(trackIMG) // This sets the thumbnail of the embed, using the variable from before.
      .addField('Song Name', trackName, true) // These are fields, and can be added easily, the true signifies that they can be on the same line.
      .addField('Album', trackAlbum, true)
      .addField('Author', trackAuthor, false) // This signifies only two can be on the line above, the third will be on a new line
      .addField('Listen to Track:', `[\`${trackURL}\`](trackURL)`, false); // This here sets a clickable link, to the trackURL, while still showing the URL in ``.
        
      message.channel.send({embed: embed})
    } else { // Although, if one of those conditions is false it will run this.
    if (!message.mentions.users.first()) {
      message.channel.send('**You aren\'t listening to Spotify!**'); // This will notify in chat that the specified user isn't listening to Spotify.
    } else {
      message.channel.send('**This user isn\'t listening to Spotify!**'); // This will notify in chat that the specified user isn't listening to Spotify.
    }
    
  }
}

exports.help = {
  name: "spotify",
  description: "shows what a user is listening to, if they are listening to spotify",
  usage: "pr!spotify <user>",
  note: "Gucci Gang Gucci Gang Gucci Gang"
}