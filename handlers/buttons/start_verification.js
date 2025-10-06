// handlers/buttons/start_verification.js
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

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
        
        const captchaImageUrl = `https://flamingtext.com/net-fu/proxy_form.cgi?script=shake-anim&text=${captchaCode}&_loc=generate&fontname=credit_card&fill_color=FFFFFF&shake_value=10&shake_direction=both`;

        const modal = new ModalBuilder()
            .setCustomId(`modal_verify_captcha_${captchaCode}`)
            .setTitle('Verificação de Humano');

        const captchaInput = new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId('input_captcha')
                .setLabel("Digite o código da imagem aqui")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("Digite os 6 caracteres que você viu")
                .setRequired(true)
                .setMinLength(6)
                .setMaxLength(6)
        );

        // 1. Envia a imagem do captcha numa mensagem que só o utilizador vê.
        await interaction.reply({
            content: `**Aqui está o seu código de verificação:**\n${captchaImageUrl}`,
            ephemeral: true
        });

        // 2. Mostra o formulário para o utilizador inserir o código.
        // Removemos o "hack" anterior que causava o crash.
        await interaction.showModal(modal.setComponents(captchaInput));
    }
};