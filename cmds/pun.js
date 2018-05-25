const request = require("request");
const Entities = require("html-entities").AllHtmlEntities;
const Discord = require('discord.js');

exports.run = async (bot, message) => {
    
    var entities = new Entities();
    request('http://www.punoftheday.com/cgi-bin/arandompun.pl', function(err, res, body) {
     if (err) message.channel.send("Service Offline")
     else {
      body = entities.decode(body);
      body = body.slice(16);
      body = body.slice(0, body.indexOf("'"))
      body = body.slice(0, body.length - 6)
      var Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(body)
      message.channel.send({embed: Embed})
     }
    });
    
}

exports.help = {
    name: "pun",
    description: "Knock em dead with these puns",
    usage: "pr!pun",
    note: "Sometimes too funny!"
}