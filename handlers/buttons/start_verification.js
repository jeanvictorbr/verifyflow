// handlers/buttons/start_verification.js
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

// Função para gerar um código aleatório
function generateCaptchaCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

module.exports = {
    customId: 'start_verification',
    async execute(interaction) {
        const captchaCode = generateCaptchaCode();

        const modal = new ModalBuilder()
            // Passamos o código correto no customId para a próxima etapa
            .setCustomId(`modal_verify_captcha_${captchaCode}`)
            .setTitle('Verificação de Humano');

        // Em vez de uma imagem, mostramos o código diretamente num campo não editável
        const codeDisplay = new ActionRowBuilder().addComponents(
             new TextInputBuilder()
                .setCustomId('captcha_code_display')
                .setLabel("Copie o código abaixo:")
                .setStyle(TextInputStyle.Short)
                .setValue(captchaCode) // O código é exibido aqui
                .setRequired(false) // O utilizador não precisa de interagir com este campo
        );
        
        const captchaInput = new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId('input_captcha')
                .setLabel("Cole o código aqui para se verificar")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("Digite os 6 caracteres que você vê acima")
                .setRequired(true)
                .setMinLength(6)
                .setMaxLength(6)
        );

        // A única resposta à interação é mostrar o modal
        await interaction.showModal(modal.setComponents(codeDisplay, captchaInput));
    }
};