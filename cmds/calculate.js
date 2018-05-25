const Discord = require('discord.js');
const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

exports.run = (bot, message) => {
    const args = message.content.split(" ").slice(1).join(" ")
    if (args.length < 1) {
        message.channel.send('You must provide a equation to be solved on the calculator')
        return;
    }


    let answer;
    try {
        answer = math.eval(args);
    } catch (err) {
       var embed = new Discord.RichEmbed()
       .setTitle("Math Failure!")
       .setColor(0xba3d2a)
       .setThumbnail("http://www.drodd.com/images15/red-x22.png")
       .addField("You put the wrong calculation!", `You put in ${args}`)
       .addField("Key:", "```md\n <Addition: +> \n <Subtraction: -> \n <Multiplication: *> \n <Division: /> \n <PEMDAS: (1+1)x1> \n```")
       message.channel.send({ embed: embed })
        return;
    };
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    message.delete();
    var embed2 = new Discord.RichEmbed()
    .setTitle("Math Calculated!")
    .setColor(randomColor)
    .setThumbnail("https://lh3.googleusercontent.com/WDs87hbKj9l2bnA8rHp5DzES5vsXuf4VWR1fmvD1RyA_b_oeeiuXaMGKn0a-_aThybI=w300")
    .addField("I have sucessfuly calculated:", `${args}`)
    .addField("The answer is:", `${answer}`)
    message.channel.send({ embed: embed2 })
			
		}
		
		exports.help = {
		    name: "calculate",
		    description: "Calculates a math problem!",
		    usage: "pr!calculate [problem]",
		    note: "Its a bit limited!"
		}