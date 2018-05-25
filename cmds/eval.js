const Discord = require ("discord.js");
const hastebin = require('hastebin-gen');
const settings = require('../Storage/botsettings.json');
exports.run = (bot, message) => {
    
    var embed = new Discord.RichEmbed()
  .setTitle("Restricted")
    .setColor("#f45f42")
  .addField("You are restricted from this command", "Its for the bot owners only!")
		
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const args = message.content.split(" ").slice(1);
  const args2 = message.content.split(' ').slice(1).join(' ');
  
    try {
         var authors = ["396027480097554432", "262410813254402048"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embed});
    return;
    }
    
    if (!args2) {
      message.channel.send("What do you want me to evaluate?");
      return;
  }
  

        const code = args.join(" ");
      let evaled = eval(code);
      
                if (clean(evaled).includes(settings.token)) {
          message.delete()
          message.channel.send("That isnt a good idea cause it includes the bot token in it")
          return;
        }
                if (code.includes(settings.token)) {
                  message.delete()
          message.channel.send("That isnt a good idea cause it includes the bot token in it")
          return;
        }
        if (code.includes("process.env")) {
          message.delete()
          message.channel.send("Why would you wanna reveal our secrets?")
          return;
        }


      if (typeof evaled !== "string")	
        evaled = require("util").inspect(evaled);

        if (clean(evaled).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nOutput: \n\n${clean(evaled)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#ffff66")
          .addField(":warning: I guess the eval was too much! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})} else {
        var embed2 = new Discord.RichEmbed()
        .setColor("#00ced1")
        .setDescription(`\`\`\`cpp\n"Evaluated"\n\`\`\`\n\`\`\`js\n${code}\n\`\`\`\n\n\`\`\`cs\n# Output\n\`\`\`\n\`\`\`js\n${clean(evaled)}\n\`\`\``)
        message.channel.send({embed : embed2 });
} 
    } catch (err) {
        const code = args.join(" ");
                if (clean(err).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nError: \n\n${clean(err)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#f44242")
          .addField(":warning: I guess the eval was too much! It also errored! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})}
      var embed3 = new Discord.RichEmbed()
      .setTitle("ERROR:")
      .setColor("#f44242")
      .addField("Evaled: :inbox_tray:", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: :outbox_tray:", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      message.channel.send({embed: embed3 });
    }
}

exports.help = {
    name: "eval",
    description: "Evaluates certain JS code",
    usage: "pr!eval <Text-To-Evaluate>",
    note: "Only my developers can use this"
}