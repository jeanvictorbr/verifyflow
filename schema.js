// schema.js
const guildSettingsTable = `
    CREATE TABLE IF NOT EXISTS guild_settings (
        guild_id VARCHAR(255) PRIMARY KEY,

        -- Sistema de Verificação
        verification_enabled BOOLEAN DEFAULT false,
        verification_role_id VARCHAR(255),

        -- Sistema de Boas-Vindas
        welcome_enabled BOOLEAN DEFAULT false,
        welcome_channel_id VARCHAR(255),
        welcome_news_channel_id VARCHAR(255),
        welcome_verification_channel_id VARCHAR(255) -- NOVA COL -- NOVA COLUNA
    );

`;

module.exports = [
    guildSettingsTable
];