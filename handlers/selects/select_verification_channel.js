// handlers/selects/select_verification_channel.js
const db = require('../../database.js');
const generateVerificationPanel = require('../../ui/verificationPanel.js');

module.exports = {
    customId: 'select_verification_channel',
    async execute(interaction) {
        const channelId = interaction.values[0];
        const channel = await interaction.guild.channels.fetch(channelId).catch(() => null);

        if (!channel) {
            return interaction.reply({ content: '❌ Canal não encontrado.', ephemeral: true });
        }

        try {
            await channel.send(generateVerificationPanel());
            await interaction.reply({ content: `✅ Painel de verificação publicado com sucesso em ${channel}!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `❌ Ocorreu um erro ao publicar o painel. Verifique se eu tenho permissão para enviar mensagens em ${channel}.`, ephemeral: true });
        }
    }
};