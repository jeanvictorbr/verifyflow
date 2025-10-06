// ui/verificationPanel.js
module.exports = function generateVerificationPanel(settings) {
    // O URL do botão de novidades agora vem das configurações
    const newsChannelUrl = settings?.welcome_news_channel_id 
        ? `https://discord.com/channels/${settings.guild_id}/${settings.welcome_news_channel_id}`
        : "https://discord.com"; // URL padrão caso não esteja configurado

    return [
        {
            "type": 17,
            "components": [
                {
                    "type": 9,
                    "accessory": {
                        "type": 2,
                        "style": 5, // Botão de Link
                        "label": "Novidades",
                        "emoji": { "name": "🆕" },
                        "url": newsChannelUrl
                    },
                    "components": [
                        { "type": 10, "content": "# Verifique-se para liberar o acesso" }
                    ]
                },
                { "type": 14, "divider": true, "spacing": 1 },
                {
                    "type": 12,
                    "items": [ { "media": { "url": "https://i.imgur.com/ECiLszt.gif" } } ]
                },
                { "type": 14, "divider": true, "spacing": 1 },
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "style": 1,
                            "label": "Verificar-me",
                            "emoji": { "name": "⚠️" },
                            "custom_id": "start_verification" // custom_id corrigido
                        }
                    ]
                }
            ]
        }
    ];
};