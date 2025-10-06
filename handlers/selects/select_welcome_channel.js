// handlers/selects/select_welcome_channel.js
const db = require('../../database.js');
const generateWelcomeMenu = require('../../ui/welcomeMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'select_welcome_channel',
    async execute(interaction) {
        await interaction.deferUpdate();
        const channelId = interaction.values[0];
        await db.query(
            `INSERT INTO guild_settings (guild_id, welcome_channel_id) VALUES ($1, $2)
             ON CONFLICT (guild_id) DO UPDATE SET welcome_channel_id = $2`,
            [interaction.guild.id, channelId]
        );
        const settings = (await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0];
        await interaction.editReply({
            components: generateWelcomeMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};