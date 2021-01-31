const Discord = require('discord.js');
const genshin = require('genshin-db');

module.exports = {
    name: '-weapon',
    description: 'Gets info about a weapon',
    command: '`genshin-weapon <weaponName>`',
    async execute(message, args, client) {
        const joined = args.join('');
        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#FFF18E')
            .setTitle("Weapon-" + genshin.weapons(joined).name)
            .setURL(genshin.weapons(joined).url)
            .setDescription(genshin.weapons(joined).description)
            .setThumbnail(genshin.weapons(joined).images.image)
            .addFields({
                name: 'Stars', value: genshin.weapons(joined).rarity, inline: true
            },
                { name: 'Weapon Type', value: genshin.weapons(joined).weapontype, inline: true },
                { name: 'Weapon Material', value: genshin.weapons(joined).weaponmaterialtype, inline: true },
                { name: genshin.weapons(joined).effectname, value: genshin.weapons(joined).effect, inline: true },
                { name: 'Base Attack', value: genshin.weapons(joined).baseatk, inline: true }
            )
            .setTimestamp()
            .setFooter('Send \'genshin-help\' for help with bot commands!');
        await message.channel.send("<@" + message.author.id + ">");

        message.channel.send(answerEmbed)
    }
}