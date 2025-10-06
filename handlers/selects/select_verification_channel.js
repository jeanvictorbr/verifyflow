// handlers/selects/select_verification_channel.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    customId: 'select_verification_channel',
    async execute(interaction) {
        // Usa deferReply em vez de reply direto para evitar crashes
        await interaction.deferReply({ ephemeral: true });

        const channelId = interaction.values[0];
        const channel = await interaction.guild.channels.fetch(channelId).catch(() => null);

        if (!channel) {
            return interaction.editReply({ content: '❌ Canal não encontrado.' });
        }

        try {
            const loadButton = new ButtonBuilder()
                .setCustomId('verification_load_panel')
                .setLabel('Carregar Painel de Verificação V2')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🔄');
            
            await channel.send({ 
                content: 'Clique no botão abaixo para carregar o painel de verificação. (Apenas administradores podem fazer isto).',
                components: [new ActionRowBuilder().addComponents(loadButton)]
            });

            // Usa editReply porque já demos deferReply
            await interaction.editReply({ content: `✅ **Botão de carregamento enviado para ${channel}!** Vá até o canal e clique no botão para publicar o painel final.` });

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `❌ Ocorreu um erro ao publicar o botão. Verifique se eu tenho permissão para enviar mensagens em ${channel}.` });
        }
    }
};