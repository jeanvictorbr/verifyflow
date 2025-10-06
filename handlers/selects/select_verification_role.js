// handlers/selects/select_verification_role.js
const db = require('../../database.js');
const generateVerificationMenu = require('../../ui/verificationMenu.js');
const V2_FLAG = 1 << 15;
const EPHEMERAL_FLAG = 1 << 6;

module.exports = {
    customId: 'select_verification_role',
    async execute(interaction) {
        await interaction.deferUpdate();
        const roleId = interaction.values[0];

        // LÓGICA CORRIGIDA: Usa INSERT ... ON CONFLICT para garantir que o dado é salvo
        // Isto cria a linha de configuração se ela não existir, ou atualiza-a se já existir.
        await db.query(
            `INSERT INTO guild_settings (guild_id, verification_role_id) VALUES ($1, $2)
             ON CONFLICT (guild_id) DO UPDATE SET verification_role_id = $2`,
            [interaction.guild.id, roleId]
        );

        const settings = (await db.query('SELECT * FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0];
        
        await interaction.editReply({
            components: generateVerificationMenu(settings),
            flags: V2_FLAG | EPHEMERAL_FLAG
        });
    }
};