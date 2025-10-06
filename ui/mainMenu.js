// ui/mainMenu.js
module.exports = function generateMainMenu() {
    return [
        {
            "type": 17,
            "components": [
                { "type": 10, "content": "## ⚙️ Painel de Configurações" },
                { "type": 10, "content": "> Escolha o sistema que deseja configurar." },
                { "type": 14, "divider": true, "spacing": 2 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": 1, "label": "Configurar", "emoji": { "name": "🛡️" }, "custom_id": "config_verification_menu" },
                    "components": [{ "type": 10, "content": `**Sistema de Verificação**\n> Configure o painel para os membros se verificarem.` }]
                },
                { "type": 14, "divider": true, "spacing": 1 },
                {
                    "type": 9,
                    "accessory": { "type": 2, "style": 1, "label": "Configurar", "emoji": { "name": "👋" }, "custom_id": "config_welcome_menu" },
                    "components": [{ "type": 10, "content": `**Sistema de Boas-Vindas**\n> Configure a mensagem para novos membros.` }]
                }
            ]
        }
    ];
};