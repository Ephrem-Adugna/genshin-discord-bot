const Discord = require('discord.js'); const firebase = require('firebase')

module.exports = {
    name: '-rps',
    description: 'Gives you the chance to play rock paper scissors with paimon and win primos! (20 primos required)',
    command: '`genshin-rps`',
    async execute(message, args) {
        firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot) => {
            const data = snapshot.val();
            if (data.primos >= 20) {
                await message.channel.send(answerEmbed).then(async msg => {
                    msg.react('🪨');
                    msg.react('📄');
                    msg.react('✂');
                    await msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '📄' || reaction.emoji.name == '✂' || reaction.emoji.name == '🪨'),
                        { max: 1, time: 20000 }).then(collected => {
                            items = ['🪨', '📄', '✂'];
                            var item = items[Math.floor(Math.random() * items.length)];

                            if (collected.first().emoji.name == item) {
                                const right = new Discord.MessageEmbed()
                                    .setColor('#FFF18E')
                                    .setTitle("You got it right!")
                                    .setDescription("<@" + message.author.id + "> \n" + "Check your primo balance! You got 20 more primogems!")
                                    .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
                                    .setTimestamp()
                                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                                msg.edit(right)
                                firebase.database().ref('users/' + message.author.id).set({
                                    username: message.author.id,
                                    primos: data.primos + 20,
                                    lastwish: 0
                                });

                            }
                            else {
                                const wrong = new Discord.MessageEmbed()
                                    .setColor('#FFF18E')
                                    .setTitle("You got it wrong")
                                    .setDescription("<@" + message.author.id + "> \n" + "You've been deducted 20 primos from your balance")
                                    .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
                                    .setTimestamp()
                                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                                msg.edit(wrong)
                                firebase.database().ref('users/' + message.author.id).set({
                                    username: message.author.id,
                                    primos: data.primos - 20,
                                    lastwish: 0
                                });
                            }
                        }).catch((error) => {
                            console.log(error);
                            msg.edit('No reaction after 20 seconds, game canceled');
                                                   })
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 2000);
                })
            }
        })

        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#FFF18E')
            .setTitle("Choose one Below!")
            .setDescription("<@" + message.author.id + "> \n" + "React with either 🪨 (rock), 📄 (paper), ✂ (scissors)")
            .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
            .setTimestamp()
            .setFooter('Send \'genshin-help\' for help with bot commands!');
    }
}