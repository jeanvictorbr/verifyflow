// handlers/buttons/config_verification_menu.js
const db = require('../../database.js');
const generateVerificationMenu = require('../../ui/verificationMenu.js'); // Garante que está a chamar o MENU e não o PAINEL
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'config_verification_menu',
    async execute(interaction) {
        // Usamos deferUpdate para evitar que a interação expire
        await interaction.deferUpdate().catch(() => {});

        // Garante que a linha de configuração existe antes de tentar ler.
        // Se não existir, cria uma.
        await db.query(`INSERT INTO guild_settings (guild_id) VALUES ($1) ON CONFLICT (guild_id) DO NOTHING`, [interaction.guild.id]);
        
        const settingsResult = await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id]);
        // Garante que 'settings' nunca é nulo, mesmo que a query não retorne nada
        const settings = settingsResult.rows[0] || {};
        
        // Usa editReply para atualizar a mensagem com o menu de configuração correto
        await interaction.editReply({
            components: generateVerificationMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};