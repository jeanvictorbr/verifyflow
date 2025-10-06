// handlers/buttons/config_verification_menu.js
const db = require('../../database.js');
const generateVerificationMenu = require('../../ui/verificationMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'config_verification_menu',
    async execute(interaction) {
        await interaction.deferUpdate().catch(() => {});

        // Garante que a linha de configuração existe antes de tentar ler
        await db.query(`INSERT INTO guild_settings (guild_id) VALUES ($1) ON CONFLICT (guild_id) DO NOTHING`, [interaction.guild.id]);
        
        const settingsResult = await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id]);
        const settings = settingsResult.rows[0] || {};
        
        await interaction.editReply({
            components: generateVerificationMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};