const Discord = require('discord.js');
const weather = require('weather-js');

exports.run = (bot, message, args) => {
    const city = message.content.split(" ").slice(1).join(" ")
    if (!city) return message.channel.send("**Error**\nYou did not include a city! Please include it so we can show the forecast!")

    weather.find({search: city, degreeType: 'F'}, function(err, result) {
        if (err) {
            message.channel.send(":x: No results on that city :x:")
            console.log(err.stack)
            return;
        } 
        let url;
        if (result[0].current.skytext === "Mostly Sunny") url = "https://openclipart.org/image/2400px/svg_to_png/3367/ivak-Decorative-Sun.png"
        else if (result[0].current.skytext === "Mostly Cloudy" || result[0].current.skytext === "Cloudy") url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Weather-heavy-overcast.svg/200px-Weather-heavy-overcast.svg.png"
        else if (result[0].current.skytext === "Partly Cloudy") url = "";
        message.channel.send(JSON.stringify(result[0].current, null, 2))
        var embed = new Discord.RichEmbed()
        .setTitle(`Forecast for ${result[0].location.name}`)
        .setColor("BLUE")
        .setThumbnail(result[0].current.imageUrl)
        .setTimestamp()
        .addField(":thermometer: Temperature :thermometer:", `**__${result[0].current.temperature}__ Degrees Fahrenheit**`)
        .addField(":city_sunset: What it looks like outside :city_sunset:", `**__${result[0].current.skytext}__**`)
        .addField(":wind_blowing_face: Feels Like :wind_blowing_face:", `**__${result[0].current.feelslike}__ Degrees Fahrenhiet**`)
        .addField(":sweat: Humidity :sweat:", `**__${result[0].current.humidity}%__**`)
        .addField(":wind_blowing_face: Wind Speed :wind_blowing_face:", `**__${result[0].current.windspeed.replace("mph", "Miles Per Hour")}__**`)
        message.channel.send({ embed: embed })
})};


exports.help = {
    name: "weather",
    description: "Gets the weather!",
    usage: "pr!weather [city]",
    note: "England is NOT a city, though it still works"
}
