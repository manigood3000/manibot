const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.once('ready', () => {
    console.log(`¡Bot encendido como ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    // Si alguien escribe !ping, el bot responde Pong
    if (message.content === '!ping') {
        message.reply('¡Pong! 🏓');
    }
});

client.login(process.env.DISCORD_TOKEN);
