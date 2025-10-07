// ui/welcomeMenu.js
module.exports = function generateWelcomeMenu(settings) {
    const systemStatus = settings?.welcome_enabled ? '✅ Ativado' : '❌ Desativado';
    const channelStatus = settings?.welcome_channel_id ? `<#${settings.welcome_channel_id}>` : '❌ Não definido';
    const verificationChannelStatus = settings?.welcome_verification_channel_id ? `<#${settings.welcome_verification_channel_id}>` : '❌ Não definido';

    const isConfigured = !!settings?.welcome_channel_id && !!settings?.welcome_verification_channel_id;

    const toggleButton = settings?.welcome_enabled
        ? { label: 'Desativar Sistema', style: 4 }
        : { label: 'Ativar Sistema', style: 3 };

    return [
        {
            "type": 17,
            "components": [
                { "type": 10, "content": "## 👋 Configuração do Sistema de Boas-Vindas" },
                { "type": 14, "divider": true, "spacing": 2 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": toggleButton.style, "label": toggleButton.label, "custom_id": "welcome_toggle_system", "disabled": !isConfigured },
                    "components": [{ "type": 10, "content": `**Status do Sistema**\n> \`${systemStatus}\`` }]
                },
                { "type": 14, "divider": true, "spacing": 1 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": 1, "label": "Definir Canal", "custom_id": "welcome_set_channel" },
                    "components": [{ "type": 10, "content": `**Enviar Boas-Vindas Para:**\n> ${channelStatus}` }]
                },
                { "type": 14, "divider": true, "spacing": 1 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": 1, "label": "Definir Canal", "custom_id": "welcome_set_verification_channel" },
                    "components": [{ "type": 10, "content": `**Link do Botão 'Comece por aqui!'**\n> Apontar para: ${verificationChannelStatus}` }]
                },
                { "type": 14, "divider": true, "spacing": 2 },
                {
                    "type": 1,
                    "components": [
                        { "type": 2, "style": 2, "label": "Voltar", "emoji": { "name": "↩️" }, "custom_id": "main_menu_back" }
                    ]
                }
            ]
        }
    ];
};