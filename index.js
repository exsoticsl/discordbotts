const { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    const keyUrl = message.content.trim();

    let apiUrl;
    if (keyUrl.startsWith('https://flux.li/')) {
        apiUrl = `https://fluxus-bypass-kkk.vercel.app/api/fluxus?link=${keyUrl}`;
    } else if (keyUrl.startsWith('https://gateway.platoboost.com/')) {
        apiUrl = `https://combined-two.vercel.app/bypass?url=${keyUrl}`;
    } else {
        return;
    }

    try {
        const response = await axios.get(apiUrl);
        const { key, status, time } = response.data;

        const embed = new EmbedBuilder()
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL()})
            .addFields(
                { name: 'Copy Key (PC)', value: `\`\`\`${key}\`\`\``},
                { name: 'Copy Key (Mobile)', value: `${key}` },
                { name: 'Time Took', value: `\`\`\`${time} seconds\`\`\`` },
            )
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: 'Made by @exsoticscripts' });

        const button = new ButtonBuilder()
            
            .setLabel('🔗 Youtube')
            .setURL("https://youtube.com/@exsoticscripts/")
            .setStyle(ButtonStyle.Link);

            const button2 = new ButtonBuilder()
            
            .setLabel('🔗 Discord')
            .setURL("https://discord.gg/M2fmrPN9vQ")
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(button,button2);

        message.reply({ embeds: [embed], components: [row] });
    } catch (error) {
        console.error(error);
        message.reply('Failed to call the API. Please try again later.');
    }
});

client.login(token);
