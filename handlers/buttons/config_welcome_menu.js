// handlers/buttons/config_welcome_menu.js
const db = require('../../database.js');
const generateWelcomeMenu = require('../../ui/welcomeMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'config_welcome_menu',
    async execute(interaction) {
        await interaction.deferUpdate().catch(() => {});
        const settings = (await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0] || {};
        await interaction.editReply({
            components: generateWelcomeMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};