const Discord = require('discord.js');
const fs = require('fs');
const firebase = require('firebase');
const client = new Discord.Client();
const prefix = 'genshin';
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
} 

client.once('ready', () => {
    console.log('Bot is online');

    client.user.setActivity("genshin-help", {type:"LISTENING"}); 
});

client.on('message', async message => {
    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    try {
        await firebase.database().ref('users/' + message.author.id).once('value').then(async (snapshot) => {
            data = await snapshot.val();
            const date = new Date();
            const diff = date.getTime() - data.lastwish;

            if (data !== null && diff >= 28800000) {
                let oldprimos = data.primos;
                     oldprimos += 60;
                    firebase.database().ref('users/' + message.author.id).set({
                        username: message.author.id,
                        primos: oldprimos,
                        lastwish: date.getTime()

                    });

                    


            }

           
        });

        client.commands.get(command).execute(message, args, client);
    }
    catch (err) {
        console.log(err);
        client.commands.get('-error').execute(message, args);

    }

})
client.login('TOKEN');