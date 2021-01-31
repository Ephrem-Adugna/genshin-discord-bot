const Discord = require('discord.js');
const firebase = require('firebase')
module.exports = {
    name: '-signup',
    description: 'Signs you up for a wishing account!',
    command: '`genshin-signup`',
    async execute(message, args) {
        firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot) => {
            var data = await snapshot.val();
            if (data == null) {
                firebase.database().ref('users/' + message.author.id).set({
                    username: message.author.id,
                    primos: 800,
                    lastwish: 0
                });

                await message.channel.send("<@" + message.author.id + ">");

                const answerEmbed = new Discord.MessageEmbed()
                    .setColor('#FFF18E')
                    .setTitle("Account Created!")
                    .setDescription("You've made your account. To wish just send `genshin-wish`. Remember, you start off 800 primogems. You get 60 primogems a day.")
                    .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
                    .setTimestamp()
                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                await message.channel.send(answerEmbed);
            }
        });
       
    }
}