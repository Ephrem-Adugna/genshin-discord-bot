const Discord = require('discord.js');
const fs = require('fs');
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
});

client.on('message', async message => {
    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    try {
        client.commands.get(command).execute(message, args, client);
    }
    catch (err) {
        client.commands.get('error').execute(message, args);

    }

})
client.login('ODA0NTQ2ODA3ODc0MTkxNDIw.YBN6mg.Omho5FAHlXfRcNK8FVrhjpGyIrs');