const Discord = require("discord.js");
const prefixes = require("../Storage/prefixes.json");

exports.run = (bot, message, args) => {
    const prefix = prefixes[message.guild.id].prefix
    let blank = args[0];
    if (!blank) {
        const commandNames = Array.from(bot.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        
        // > Send to Author the commands list
        message.author.send(`/* Command List *\nYou can use ${prefix}help [commandname] to get details on a specific command!\n-----------------------------------------------------------------------`, {code: "md"})
        message.author.send(`${bot.commands.map(c => `#${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)}<${c.help.usage}>`).slice(0, 27).join('\n')}`, {code: "cpp"})
        message.author.send(`${bot.commands.map(c => `#${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)}<${c.help.usage}>`).slice(28, 55).join('\n')}`, {code: "cpp"})
        message.author.send(`${bot.commands.map(c => `#${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)}<${c.help.usage}>`).slice(56, 83).join('\n')}`, {code: "cpp"})
        // > Send in channel that we sent commands list
        message.channel.send(":e_mail: Check your DM's :incoming_envelope:")
    } else {
        let command = blank;
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            message.channel.send(`${command.help.name}\n-------------\n[Description](${command.help.description})\n[Usage](${command.help.usage})\n[Note](${command.help.note})`, {code:'md'});
        } else {
        if (!bot.commands.has(command)) {
            message.channel.send(`I do not think **${command}** is an actual command`)
        }
        }
    } 
}

exports.help = {
    name: "help",
    description: "Shows all of the available commands that are available to be used",
    usage: "pr!help",
    note: "Shows the available commands"
}
