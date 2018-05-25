const Discord = require("discord.js");
const xml2js = require('xml2js');
const _request 	= require("request");
const snekfetch = require('snekfetch')

exports.run = async (bot, message) => {
    const website = message.content.split(' ').slice(1).join(" ")
    if (!website.includes("rule34") && !website.includes("e621")) return message.channel.send("**Error**\nYou did not include a website, the website list are `rule34`, and `e621`")
    var args1 = message.content.split(' ').slice(2);
const args = args1.join(' ');
if (!args) return message.reply("Search something!");

 if (!message.channel.nsfw) {
    return message.channel.send("Please be a bit more respectful, this is not an NSFW channel...");
 } else {
    if (args1.includes('loli') || args1.includes('lolicon') || args1.includes('shota') || args1.includes('shotacon') || args1.includes('child') || args1.includes('kid') || args1.includes('kids') || args1.includes('children')) return message.reply('please dont be that grosskthxz');
    let url;
    if (website.includes("rule34")) url = "http://www.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=" + args.toLowerCase();
    if (website.includes("e621")) url = `https://e621.net/post?tags=${args.toLowerCase()}`
    _request(url, function(error, response, body) {
    if (error) {
        console.log("Error rule34.js: ", error);
    }
    xml2js.parseString(body, function(error, result) {
        if (error) {
        console.log("Error rule34.js: ", error);
        }
        try {
        var amountOfPosts = result.posts.post.length;
        var randomPost = Math.floor(Math.random() * amountOfPosts);
        console.log(result.posts.post[randomPost].$.file_url.substr(7))
        var imageLink = "http:/" + result.posts.post[randomPost].$.file_url.substr(7);
        console.log(imageLink)
        var embed = new Discord.RichEmbed()
        .setAuthor(`Rule34 Search \"${args}\"`)
        .setFooter("Thank you Immortality#2312 for command")
        .setURL(imageLink)
        .setImage(imageLink)
        .setTimestamp();
        message.channel.send(embed);
        } catch (e) {
        message.reply("No Results.");
        }
    });
    });
};
    
}

exports.help = {
    name: "r34",
    description: "Does it need one?",
    usage: "pr!r34 <Website> <Search>",
    note: "Make sure your parents arent near you!"
}