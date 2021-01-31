const Discord = require('discord.js');
const genshin = require('genshin-db');

module.exports = {
    name: '-const',
    description: 'Gets info about a constellation',
    command: '`genshin-const <characterName>`',
    async execute(message, args, client) {
        const joined = args.join('');
        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#FFF18E')
            .setTitle("Constelation-" + genshin.constellations(joined).name)
            .setURL(genshin.characters(joined).url)
            
            .setThumbnail(genshin.characters(joined).images.image)
            .addFields({
                name: genshin.constellations(joined).c1.name, value: genshin.constellations(joined).c1.effect, inline: true
            },
                {
                    name: genshin.constellations(joined).c2.name, value: genshin.constellations(joined).c2.effect, inline: true
 },
              
               )
            .addFields({
                name: genshin.constellations(joined).c3.name, value: genshin.constellations(joined).c3.effect
            },
                {
                    name: genshin.constellations(joined).c4.name, value: genshin.constellations(joined).c4.effect, inline: true
                })
            .addFields({
                name: genshin.constellations(joined).c5.name, value: genshin.constellations(joined).c5.effect, inline: true
            }, {
                name: genshin.constellations(joined).c6.name, value: genshin.constellations(joined).c6.effect
            })
            .setTimestamp()
            .setFooter('Send \'genshin-help\' for help with bot commands!');
        await message.channel.send("<@" + message.author.id + ">");

        message.channel.send(answerEmbed)
    }
}