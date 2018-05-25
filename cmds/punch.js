const jimp = require("jimp");
 
 exports.run = async (bot, message) => {
     if (!message.mentions.users.first()) return message.channel.send("Great job! you punched the air! You should maybe try punching someone next time.");
 
     let authorURL = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(0, 5) + ".png" : message.author.displayAvatarURL;
     let targetPerson = message.mentions.users.first()
     let targetURL = targetPerson.displayAvatarURL.endsWith(".webp") ? targetPerson.displayAvatarURL.slice(0, 5) + ".png" : targetPerson.displayAvatarURL;
 
         if (targetPerson.id === message.author.id) {
         return message.channel.send("Why would you want to punch yourself?");
     }
     if (targetPerson.id === "369681763104194580" || targetPerson.id === "361516875349491713") {
      return message.channel.send("What did I do to deserve getting punched?")
     }
     

  
 
     jimp.read("https://gyazo.com/8a4d4563ef62f508963f08696371b296.png", (err, image) => {
         if (err) return console.log(err);
             jimp.read(targetURL, (err, target) => {
                 if (err) return console.log(err);
                 target.resize(90, 110);
                 image.composite(target, 90, 55);
                 image.getBuffer(jimp.AUTO, (err, buff) => {
                     if (err) return console.log(err);
                     var sayings = [
                         "until their guts spew out",
                         "until their head cracks open",
                         "until their spine falls out",
                         "until their heart explodes",
                         "until their brain malfunctions",
                         "until their legs cracks",
                         "until their whole body cracks open"
                         ]
                         var randomizer = Math.floor(Math.random()*sayings.length);
                     message.channel.send(`**${message.author.username}** *punches* **${message.mentions.users.first().username}** *${sayings[randomizer]}*`);
                     message.channel.send({file: buff});
                 })
             })
         })  
 }
 
 exports.help = {
     name: "punch",
     description: "Sucker punch a user!",
     usage: "pr!punch <MentionedUser>",
     note: "Not too hard"
 }