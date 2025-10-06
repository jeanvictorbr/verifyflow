// ui/verificationPanel.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = function generateVerificationPanel() {
    const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('✅ Sistema de Verificação')
        .setDescription('Para garantir a segurança da nossa comunidade, pedimos que todos os membros se verifiquem.\n\nClique no botão abaixo para provar que você é um humano e obter acesso a todos os canais do servidor!')
        .setFooter({ text: 'Este processo é rápido e ajuda a proteger-nos contra bots.' });

    const button = new ButtonBuilder()
        .setCustomId('start_verification')
        .setLabel('Verificar')
        .setStyle(ButtonStyle.Success)
        .setEmoji('🛡️');

    return { embeds: [embed], components: [new ActionRowBuilder().addComponents(button)] };
};