// Crie em: handlers/buttons/verification_load_panel.js
const { PermissionFlagsBits } = require('discord.js');
const db = require('../../database.js');
const generateVerificationPanel = require('../../ui/verificationPanel.js');
const V2_FLAG = 1 << 15;

module.exports = {
    customId: 'verification_load_panel',
    async execute(interaction) {
        // Garante que apenas administradores possam carregar o painel
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ Você não tem permissão para usar este botão.', ephemeral: true });
        }
        
        const settings = (await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0] || {};
        
        // Adiciona o ID da guild às configurações para construir o URL do botão
        settings.guild_id = interaction.guild.id;

        const panelPayload = generateVerificationPanel(settings);

        // Substitui a mensagem do botão pelo painel V2
        await interaction.update({
            content: null,
            components: panelPayload,
            flags: V2_FLAG
        });
    }
};