const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: '-help',
    description: 'Returns a help screen like this!',
    command: '`genshin-help`',
    async execute(message, args, client) {
        await message.channel.send("<@" + message.author.id + ">");

        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#FFF18E')
            .setTitle("Help")
            .setDescription("Genshin Bot Commands")
            .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
            .setTimestamp()
            .setFooter('Send \'genshin-help\' for help with bot commands!');
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            answerEmbed.addField(command.description, command.command)
        }

        await message.channel.send(answerEmbed);
    }
}
