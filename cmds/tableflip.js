exports.run = async (bot, message) => {
    message.channel.send("(°-°)\\ ┬─┬").then(m => {
        setTimeout(() => {
            m.edit("(╯°□°)╯    ]").then(ms => {
                setTimeout(() => {
                    ms.edit("(╯°□°)╯  ︵  ┻━┻")
                }, 250)
            })
        }, 250);

    });
    
}

exports.help = {
    name: "tableflip",
    description: "Flips a table",
    usage: "pr!tableflip",
    note: "It's animated!"
}