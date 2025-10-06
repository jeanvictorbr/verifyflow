// handlers/buttons/verification_toggle_system.js
const db = require('../../database.js');
const generateVerificationMenu = require('../../ui/verificationMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'verification_toggle_system',
    async execute(interaction) {
        await interaction.deferUpdate();
        await db.query('UPDATE guild_settings SET verification_enabled = NOT COALESCE(verification_enabled, false) WHERE guild_id = $1', [interaction.guild.id]);
        const settings = (await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0];
        await interaction.editReply({
            components: generateVerificationMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};