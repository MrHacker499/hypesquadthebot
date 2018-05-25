const Discord = require("discord.js");
const dateFormat = require('dateformat');

exports.run = async(bot, message, args) => {
    
    const now = new Date();
				 dateFormat(now, '***On dddd, mmmm dS, yyyy, h:MM:ss TT***');

	let region = {
		"brazi": "**Brazil** :flag_br:",
		"eu-central": "**Central Europe** :flag_eu:",
        "singapore": "**Singapore** :flag_sg:",
        "us-central": "**U.S. Central** :flag_us:",
        "sydney": "**Sydney** :flag_au:",
        "us-east": "**U.S. East** :flag_us:",
        "us-south": "**U.S. South** :flag_us:",
        "us-west": "**U.S. West** :flag_us:",
        "eu-west": "**Western Europe** :flag_eu:",
        "singapore": "**Singapore** :flag_sg:",
        "london": "**London** :flag_gb:",
        "japan": "**Japan** :flag_jp:",
        "russia": "**Russia** :flag_ru:",
        "hongkong": "**Hong Kong** :flag_hk:"
	}
	let icon;
	if (message.guild.iconURL) {
	    icon = message.guild.iconURL
	}
	if (!message.guild.iconURL) {
	    icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Blue_computer_icon.svg/2000px-Blue_computer_icon.svg.png"
	}
	let owner = message.guild.owner.user
	if (!owner) {
	    owner = "None for some reason..."
	};
	
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;



    const verificationLevels = ['**None**', '**Low**', '**Medium**', '**(╯°□°）╯︵ ┻━┻** (High)', '**┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻** (Extreme)'];
   const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  
  var embed = new Discord.RichEmbed()
    .setTitle(`**Server Info for ${message.guild.name}** 👪`)
    .setColor("#00ced1")
    .setThumbnail(icon)
    .addField("**Guild ID** :id:", `***>***__${message.guild.id}__`, true)
    .addField("***Created On** <:added:394910274177597491>", `***>***__${dateFormat(message.guild.createdAt)}__`)
    .addField("**Region** :gay_pride_flag:", `***>***__${region[message.guild.region]}__`, true)
    .addField("**User Count** 👥", `***>***__${message.guild.members.filter(m => m.presence.status !== 'offline').size} **Online** out of ${message.guild.memberCount} **members**__`, true)
    .addField("**Owner** :prince:", `***>***__${owner.username}__`, true)
    .addField("**Text Channels Count** :speaker:", `***>***__${message.guild.channels.filter(m => m.type === 'text').size} Text Channels__ ***(Do "pr!tchannels" to get all the text channels in the server!)***`, true)
    .addField("**Voice Channels Count** :loudspeaker:", `***>***__${message.guild.channels.filter(m => m.type === 'voice').size} Voice Channels__ ***(Do "pr!vchannels" to get all the voice channels in the server!)***`, true)
    .addField("**Verification Level** 📶", `***>***__${verificationLevels[message.guild.verificationLevel]}__`, true)
    .addField("**Roles Count** :scroll:", `***>***__${message.guild.roles.size} Roles__ ***(Do "pr!roles" to get all the roles in the server!)***`, true)
    message.channel.send({ embed: embed });
}

exports.help = {
    name: "serverinfo",
    description: "Shows information about the server",
    usage: "pr!serverinfo",
    note: "Shows info about the server"
}