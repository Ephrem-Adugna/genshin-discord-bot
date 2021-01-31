const Discord = require('discord.js');
const genshin = require('genshin-db');
const fs = require('fs');

module.exports = {
    name: '-artifact',
    description: 'Gets info about an artifact',
    command: '`genshin-artifact <artifactName(berserker) no spaces(luckydog)> <artifactType(flower, sands, circlet, plume, goblet)>`',
    async execute(message, args, client) {
        if (args.length > 0) {

            const joined = args[0];
            const answerEmbed = new Discord.MessageEmbed()
                .setColor('#FFF18E')
                .setTitle("Artifact-" + genshin.artifacts(joined)[args[1]].name)
                .setDescription(genshin.artifacts(joined)[args[1]].description)
                .setThumbnail(genshin.artifacts(joined)[args[1]].images.image)
                .addFields({
                    name: 'Minimum Stars', value: genshin.artifacts(joined).minrarity, inline: true
                },
                    {
                        name: 'Maximum Stars', value: genshin.artifacts(joined).maxrarity, inline: true
                    },
                    { name: '2pc', value: genshin.artifacts(joined)['2pc'], inline: true },
                    { name: '4pc', value: genshin.artifacts(joined)['4pc'], inline: true },
                )
                .setTimestamp()
                .setFooter('Send \'genshin-help\' for help with bot commands!');
            await message.channel.send("<@" + message.author.id + ">");

            message.channel.send(answerEmbed)
        }
        else {
            const answerEmbed = new Discord.MessageEmbed()
                .setColor('#FFF18E')
                .setTitle("List of Artifacts")
                .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
                .setTimestamp()
                .setFooter('Send \'genshin-help\' for help with bot commands!');
            const characters = fs.readdirSync('./node_modules/genshin-db/src/english/artifacts');
            let description = "";
            await characters.forEach(character => {
                let title = character.replace('.json', '');
                title = title.split('');
                title[0] = title[0].toUpperCase();
                title = title.join('');
                description += '**' + title + '**\n';
            });
            answerEmbed.setDescription(description)
            await message.channel.send("<@" + message.author.id + ">");

            message.channel.send(answerEmbed)
        }
    }
}