const Discord = require('discord.js');
const firebase = require('firebase')
const { tictactoe } = require('reconlx')

module.exports = {
    name: '-ttt',
    description: 'Starts a game of tic tac toe (costs 4 primogems)',
    command: '`genshin-ttt @SecondPlayer`',
    async execute(message, args, client) {
        firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot) => {
            firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot1) => {

                var data = await snapshot.val();
                var data2 = await snapshot1.val();
                if (data !== null && data.primos > 3 && message.mentions.users.first() !== undefined && data.primos > 3) {
                message.react('✅');
                message.react('❌');
                let ready = false;
                await message.channel.send("<@" + message.mentions.users.first() + ">" + " <@" + message.author.id + "> is challenging you to a tic tac toe match! React to their message with ✅ to accept! (or with ❌ to decline)").then(async msg  => {
                 await message.awaitReactions((reaction, user) => user.id == message.mentions.users.first() && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                    { max: 1, time: 20000 }).then(collected => {
                        if (collected.first().emoji.name == '✅' ) {
                            msg.edit("<@" + message.mentions.users.first() + "> accepted!");
                            ready = true;                          
                        }
                        else
                            msg.edit("<@" + message.mentions.users.first() + "> declined your match");
                    }).catch((error) => {
                        console.log(error);
                        msg.edit('No reaction after 20 seconds, operation canceled');
                        setTimeout(() => {
                            msg.delete();

                        }, 1000);
                    })
                if(ready){
                    new tictactoe({
                        player_two: message.mentions.users.first(),
                        message: message
                    })

                }
                });

                
                
            }
                else {
                    const answerEmbed = new Discord.MessageEmbed()
                        .setColor('#FFF18E')
                        .setTitle("Tic Tac Toe Error")
                        .setDescription("Please make sure both players have an account with 4 primogems or more.")
                        .setThumbnail('https://i.imgur.com/I7ZL2CR.png')
                        .setTimestamp()
                        .setFooter('Send \'genshin-help\' for help with bot commands!');
                    message.channel.send(answerEmbed);
}
            });
        });

    }
}