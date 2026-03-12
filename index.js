const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios'); // Necesitamos esto para "leer" el stock de internet
require('dotenv').config();

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.once('ready', () => {
    console.log('¡Manibot de Stock listo!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!stock') {
        try {
            // Usamos una API pública que rastrea el stock de Blox Fruits
            const response = await axios.get('https://api.blox-fruits.com/v1/stock'); 
            const stock = response.data;

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('🛒 STOCK ACTUAL - BLOX FRUITS')
                .addFields(
                    { name: '🍎 Stock Normal', value: stock.normal.join(', ') || 'Cargando...', inline: false },
                    { name: '🏝️ Stock Mirage Island', value: stock.mirage.join(', ') || 'No disponible', inline: false }
                )
                .setTimestamp()
                .setFooter({ text: 'Actualizado automáticamente' });

            message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply('❌ No pude conectar con el servidor de stock. Inténtalo más tarde.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);    
