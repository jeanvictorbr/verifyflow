// handlers/buttons/welcome_toggle_system.js
const db = require('../../database.js');
const generateWelcomeMenu = require('../../ui/welcomeMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'welcome_toggle_system',
    async execute(interaction) {
        await interaction.deferUpdate();
        await db.query(
            `INSERT INTO guild_settings (guild_id, welcome_enabled) VALUES ($1, true)
             ON CONFLICT (guild_id) DO UPDATE SET welcome_enabled = NOT guild_settings.welcome_enabled`,
            [interaction.guild.id]
        );
        const settings = (await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0];
        await interaction.editReply({
            components: generateWelcomeMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};