const Discord = require('discord.js');
var snoowrap = require('snoowrap');

module.exports = {
    name: '-meme',
    description: 'Gets a random meme from the r/Genshin_Memepact',
    command: '`!genshin-meme category(new, hot, top)` category is optional',
    async execute(message, args, client) {

        const r = new snoowrap({
            userAgent: 'Test',
            clientId: 'eaHYq0clSyXQ8Q',
            clientSecret: 'ApCB0Fnd1Xej8f9qFHkrzKGIkHRD-g',
            refreshToken: '381619679561-yAfvvTyIDoVTIgB_2N6dyTyc8eIcLQ'
        });
        var content;
        var title;
        if (args[0] == undefined) args[0] = "";
        switch (args[0].toLowerCase()) {
            case "new":
                (await r.getSubreddit("Genshin_Memepact")).getNew().then(async post => {
                    title = post[0].title;
                    content = post[0].url;
                    sendMessage(content, title);
                });
                break;
            case "hot":
                (await r.getSubreddit("Genshin_Memepact")).getHot().then(async post => {
                    title = post[1].title;
                    content = post[1].url;
                    sendMessage(content, title);
                });
                break;
            case "top":
                (await r.getSubreddit("Genshin_Memepact")).getTop().then(async post => {
                    title = post[0].title;
                    content = post[0].url;
                    sendMessage(content, title);
                });
                break;
            default:
                (await r.getSubreddit("Genshin_Memepact")).getNew().then(async post => {
                    title = post[0].title;
                    content = post[0].url;
                    sendMessage(content, title);
                });
                break;
    }

          async  function sendMessage(description, name) {
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
                await message.channel.send("<@" + message.author.id + ">");

                message.channel.send(answerEmbed);
            }
        }
    }
