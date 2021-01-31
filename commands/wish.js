const Discord = require('discord.js');
const fs = require('fs');
const firebase = require('firebase')
var config = {
   CONFIGHERE
};
firebase.initializeApp(config);


module.exports = {
    name: '-wish',
    description: 'Lets you make a wish',
    command: '`genshin-wish`',
    async execute(message, args, client) {
        let primos = undefined;
        var data;
       await firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot) => {
            data = await snapshot.val();
           if (data !== null) {
               let oldprimos = data.primos;
               const date = new Date();
               primos = 0;

               const diff = date.getTime() - data.lastwish;

               if (diff >= 28800000) {

                   oldprimos += 60;

                  
               }
               primos += oldprimos;

               
           }
           
            else {
                const answerEmbed = new Discord.MessageEmbed()
                    .setColor('#FFF18E')
                    .setTitle('Wishing Account Not Found')
                    .setDescription('Looks like you don\'t have a wishing account. No worries, you can sign up by sending `genshin-signup`')
                    .setTimestamp()
                    .setThumbnail('https://i.imgur.com/I7ZL2CR.png')

                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                await message.channel.send(answerEmbed)
            }
 
        });
        
        if (primos >= 160) {

            primos -= 160;
            const characters = fs.readdirSync('./node_modules/genshin-db/src/english/characters');
            const weapons = fs.readdirSync('./node_modules/genshin-db/src/english/weapons');
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
                    .setImage('https://media1.tenor.com/images/ce256fb05103837f9f17a0048fb41e0b/tenor.gif')
                    .setTimestamp()
                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                const wish = new Discord.MessageEmbed()
                    .setColor('#FFF18E')
                    .setTitle("You got " + name + "\nStars: " + stars)
                    .setImage(icon)
                    .addField('Primogems', primos)

                    .setDescription(description)
                    .setTimestamp()
                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                await message.channel.send("<@" + message.author.id + ">");
                await message.channel.send(answerEmbed).then(msg => {

                    setTimeout(() => {
                        msg.edit(wish);

                    }, 6000);
                });

            }
        }
        else if(primos < 160){
            const answerEmbed = new Discord.MessageEmbed()
                .setColor('#FFF18E')
                .setTitle('Not Enough Primos')
                .setDescription('You don\'t have any primogems left today, wait until the next day for more')
                .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
                .setTimestamp()
                .setFooter('Send \'genshin-help\' for help with bot commands!');
            await message.channel.send(answerEmbed)
        }
        const date = new Date();
        const day = date.getTime();

        firebase.database().ref('users/' + message.author.id).set({
            username: message.author.id,
            primos: primos,
            lastwish: day

        });

    }
}