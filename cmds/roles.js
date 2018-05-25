

exports.run = async (bot, message, args) => {
    let listRoles = message.guild.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => `<@&${role.id}>`).join(" ❱ ")
    if (!listRoles) listRoles = "None"
    message.channel.send({
            embed: {
                color: 0x503d82,
                description: `The following roles are on **${message.guild.name}**\n\n${listRoles.length > 1024 ? "\'The roles list is too long to list.\'" : listRoles}\n \u200B`
            }
        })
}

exports.help = {
    name: "roles",
    description: "Lists all the roles on the discord server",
    usage: "pr!roles",
    note: "Credits to Morfixx#2348 for the help"
}