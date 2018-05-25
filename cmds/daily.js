const Discord = require('discord.js');
const moment = require('moment');
const economy = require('../Storage/economy.json')

exports.run = (bot, message, args) => {
           if (economy[message.author.id + message.guild.id].lastDaily != moment().format('L')) {
  economy[message.author.id + message.guild.id].lastDaily = moment().format('L') 
economy[message.author.id + message.guild.id].money += 100;
var embed = new Discord.RichEmbed()
.setTitle("Daily of $100!")
.setColor("#42f44e")
.setTimestamp()
.setThumbnail("https://maxcdn.icons8.com/Share/icon/Finance//money_bag1600.png")
.addField(`${message.author.tag},`, "You got your daily of $100! Enjoy the cash!")
message.channel.send({ embed: embed });
} else {
  var embed2 = new Discord.RichEmbed()
  .setTitle("You need to wait...")
  .setColor("#ef0000")
  .setTimestamp()
  .setThumbnail("http://2.bp.blogspot.com/-OVwo9SYyioI/TzZYFM9mQqI/AAAAAAAAAGM/J7lBvP1XOfk/w1200-h630-p-k-no-nu/dollar+sign+no+entry.png")
  .addField(`${message.author.tag}, you already got your daily!`, `Come back in ${moment().endOf('day').fromNow()} to claim your reward!`)
  message.channel.send({ embed: embed2 })
}}

exports.help = {
    name: "daily",
    description: "Get your daily money!",
    usage: "pr!daily",
    note: "If you already collected it, you cant get it again until the next day!"
}