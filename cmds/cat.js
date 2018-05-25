const Discord = require('discord.js');
const request = require("request");

exports.run = async (bot, message, args) => {
    var requesting = request.get('http://thecatapi.com/api/images/get.php/jpg.php?type=jpg', function(err, res, body) {
        if (err) {
            console.log("An error was found while pushing a cat image so I've moved to trying to send a PNG image!");
            var requesting2 = request.get('http://thecatapi.com/api/images/get.php/png.php?type=png', function(err, res, body) {
                if (err) {
                    var requesting3 = request.get('http://thecatapi.com/api/images/get.php/png.php?type=png', function(err, res, body) {
                        if (err) {
                            return message.channel.send("I couldn't find any Cat pictures or GIFs sorry!");
                        }
                        message.channel.send({file: requesting3.uri.href})
                    })
                }
                message.channel.send({file: requesting2.uri.href})
            })
        }
        message.channel.send({file: requesting.uri.href})
    })
    
    
    
}

exports.help = {
    name: "cat",
    description: "Sends a picture of a cat!",
    usage: "pr!cat",
    note: "Sometimes too cute!"
}