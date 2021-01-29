const Discord = require('discord.js');
const genshin = require('genshin-db');
const fs = require('fs');

module.exports = {
    name: '-wish',
    description: 'Lets make a wish',
    command: '`genshin-wish` Banner is event',
    async execute(message, args, client) {
        const characters = fs.readdirSync( './node_modules/genshin-db/src/english/characters');
        const weapons = fs.readdirSync( './node_modules/genshin-db/src/english/weapons');
        let all = characters.concat(weapons);
        var rand = all[Math.floor(Math.random() * all.length)];
        if (fs.existsSync(`./node_modules/genshin-db/src/english/characters/${rand}`)) {
            const file = require(`../node_modules/genshin-db/src/english/characters/${rand}`);
            const name = file.name;
            const stars = file.rarity;
            const fullimage = file.images.card;
            const description = file.description;
            sendMessage(name, fullimage, stars, description);

        }
        else {
            const file = require(`../node_modules/genshin-db/src/english/weapons/${rand}`);
            const name = file.name;
            const icon = file.images.image;
            const stars = file.rarity;
            const description = file.description;
            sendMessage(name, icon, stars, description);
        }
       async function sendMessage(name, icon, stars, description) {
            const answerEmbed = new Discord.MessageEmbed()
                .setColor('#FFF18E')
                .setTitle("You got " + name + "\nStars: " + stars)
                .setImage(icon)
                .setDescription(description)
                .setTimestamp()
                .setFooter('Send \'genshin-help\' for help with bot commands!');
         
            await message.channel.send("<@" + message.author.id + ">");

            message.channel.send(answerEmbed);
        }
    }
}