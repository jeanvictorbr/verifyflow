// handlers/buttons/verification_set_role.js
const { ActionRowBuilder, RoleSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'verification_set_role',
    async execute(interaction) {
        const selectMenu = new RoleSelectMenuBuilder()
            .setCustomId('select_verification_role')
            .setPlaceholder('Selecione o cargo que os membros verificados receberão');
        const cancelButton = new ButtonBuilder().setCustomId('config_verification_menu').setLabel('Cancelar').setStyle(ButtonStyle.Secondary);
        await interaction.update({
            components: [new ActionRowBuilder().addComponents(selectMenu), new ActionRowBuilder().addComponents(cancelButton)],
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};