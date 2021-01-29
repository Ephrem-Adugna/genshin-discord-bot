const Discord = require('discord.js');
module.exports = {
    name: 'error',
    description: 'Sends an error message',
    command: '`[No Command]`',
    async execute(message, args) {
        await message.channel.send("<@" + message.author.id + ">");

        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#FFF18E')
            .setTitle("Error")
            .setDescription("The command you requested either does not exist or you have insufficient permissions")
            .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
            .setTimestamp()
            .setFooter('Send \'genshin-help\' for help with bot commands!');
        await message.channel.send(answerEmbed);
    }
}