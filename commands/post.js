const Discord = require('discord.js');
var snoowrap = require('snoowrap');

module.exports = {
    name: '-meme',
    description: 'Gets a random meme from the r/Genshin_Memepact',
    command: '`!genshin-meme`',
    async execute(message, args, client) {

            const r = new snoowrap({
                userAgent: 'Test',
                clientId: 'eaHYq0clSyXQ8Q',
                clientSecret: 'ApCB0Fnd1Xej8f9qFHkrzKGIkHRD-g',
                refreshToken: '381619679561-yAfvvTyIDoVTIgB_2N6dyTyc8eIcLQ'
            });
            var content;
        var title;
         
        r.getSubreddit("Genshin_Memepact").getNew().then(async post => {
                        title = post[0].title;
                        content = post[0].url;
                        sendMessage(content, title);
                    });
            

            function sendMessage(description, name) {
                const answerEmbed = new Discord.MessageEmbed()
                    .setColor('#FFF18E')
                    .setTitle(name)
                    .setTimestamp()
                    .setImage()
                    .setFooter('Send \'genshin-help\' for help with bot commands!');
                if (validURL(description)) {
                    answerEmbed.setImage(description);
            
                }
                else {
                    answerEmbed.setDescription(description);
                }
                function validURL(str) {
                    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                    return !!pattern.test(str);
                }
                message.channel.send(answerEmbed);
            }
        }
    }
