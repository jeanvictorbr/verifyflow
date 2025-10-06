// ui/verificationMenu.js
module.exports = function generateVerificationMenu(settings) {
    const systemStatus = settings?.verification_enabled ? '✅ Ativado' : '❌ Desativado';
    const roleStatus = settings?.verification_role_id ? `<@&${settings.verification_role_id}>` : '❌ Não definido';

    const isConfigured = !!settings?.verification_role_id;

    const toggleButton = settings?.verification_enabled
        ? { label: 'Desativar Sistema', style: 4 }
        : { label: 'Ativar Sistema', style: 3 };

    return [
        {
            "type": 17,
            "components": [
                { "type": 10, "content": "## 🛡️ Configuração do Sistema de Verificação" },
                { "type": 10, "content": "> Ative o sistema e defina o cargo que os membros receberão ao se verificarem." },
                { "type": 14, "divider": true, "spacing": 2 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": toggleButton.style, "label": toggleButton.label, "custom_id": "verification_toggle_system", "disabled": !isConfigured },
                    "components": [{ "type": 10, "content": `**Status do Sistema**\n> \`${systemStatus}\`` }]
                },
                { "type": 14, "divider": true, "spacing": 1 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": 1, "label": "Definir Cargo", "custom_id": "verification_set_role" },
                    "components": [{ "type": 10, "content": `**Cargo de Verificado**\n> ${roleStatus}` }]
                },
                { "type": 14, "divider": true, "spacing": 2 },
                {
                    "type": 1,
                    "components": [
                        { "type": 2, "style": 2, "label": "Voltar", "emoji": { "name": "↩️" }, "custom_id": "main_menu_back" },
                        { "type": 2, "style": 4, "label": "Publicar Painel", "custom_id": "verification_publish_panel", "disabled": !isConfigured || !settings?.verification_enabled }
                    ]
                }
            ]
        }
    ];
};