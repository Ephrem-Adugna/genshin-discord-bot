const Discord = require('discord.js');
const firebase = require('firebase')

module.exports = {
    name: '-balance',
    description: 'Returns your primo balance to you',
    command: '`genshin-balance`',
    async execute(message, args) {
        firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot) => {
            var data = await snapshot.val();
            if (data !== null) {
                await message.channel.send("<@" + message.author.id + ">");

                const answerEmbed = new Discord.MessageEmbed()
                    .setColor('#FFF18E')
                    .setTitle("Primogems")
                    .setDescription("You have **"+data.primos+" primogems** left in your account.")
                    .setThumbnail('https://i.imgur.com/0ZKBxLB.png')
                    .setTimestamp()
                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                await message.channel.send(answerEmbed);
            }
        });
     
    }
}