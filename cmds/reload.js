const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = (bot, message, args) => {
    var embedNoWork = new Discord.RichEmbed()
  .setTitle("Restricted")
    .setColor("#f45f42")
  .addField("You are restricted from this command", "Its for the bot owners only!")
    
    var authors = ["396027480097554432", "262410813254402048"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embedNoWork});
    }
    
  const term = require( 'terminal-kit' ).terminal ;

  if (!args || args.length < 1) return message.channel.send("Must provide a command name to reload!");

    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.channel.send("Succesfully reloaded " + `${args[0]}`)

let progressBar , progress = 0 ;

  function doProgress()
  {
    progress += Math.random() / 10 ;
    progressBar.update( progress ) ; 

    if ( progress >= 1 )
    {
    console.log(`The command ${args[0]} has been reloaded`)
    }
    else
    {
      setTimeout( doProgress , 100 + Math.random() * 400 ) ;
    }
  }


  progressBar = term.progressBar({
    width: 80 ,
    title: 'Reloading Command '+args[0]+':' ,
    eta: true ,
    percent: true
  });
  doProgress();
}

exports.help = {
    name: "reload",
    description: "Reloads specificed command",
    usage: "pr!reload [command-name]",
    note: "Makes it easier for the devs to try a command"
}