// handlers/buttons/welcome_set_channel.js
const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle } = require('discord.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'welcome_set_channel',
    async execute(interaction) {
        const selectMenu = new ChannelSelectMenuBuilder()
            .setCustomId('select_welcome_channel')
            .setPlaceholder('Selecione o canal para as boas-vindas')
            .addChannelTypes(ChannelType.GuildText);
        const cancelButton = new ButtonBuilder().setCustomId('config_welcome_menu').setLabel('Cancelar').setStyle(ButtonStyle.Secondary);
        await interaction.update({
            components: [new ActionRowBuilder().addComponents(selectMenu), new ActionRowBuilder().addComponents(cancelButton)],
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};