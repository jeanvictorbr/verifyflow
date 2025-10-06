// commands/configurar.js
const { SlashCommandBuilder } = require('discord.js');
const generateMainMenu = require('../ui/mainMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configurar')
        .setDescription('Abre o painel de configurações do bot.'),

    async execute(interaction) {
        await interaction.reply({
            components: generateMainMenu(),
            flags: V2_FLAG | EPHEMERAL_FLAG,
        });
    },
};