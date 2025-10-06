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
        
        // Usamos um serviço externo para gerar a imagem do captcha
        const captchaImageUrl = `https://flamingtext.com/net-fu/proxy_form.cgi?script=shake-anim&text=${captchaCode}&_loc=generate&fontname=credit_card&fill_color=FFFFFF&shake_value=10&shake_direction=both`;

        const modal = new ModalBuilder()
            // Passamos o código correto no customId para a próxima etapa
            .setCustomId(`modal_verify_captcha_${captchaCode}`)
            .setTitle('Verificação de Humano');

        const description = new ActionRowBuilder().addComponents(
             new TextInputBuilder()
                .setCustomId('info')
                .setLabel(`Copie o código da imagem abaixo:`)
                .setStyle(TextInputStyle.Short)
                .setPlaceholder(captchaImageUrl) // Hack para exibir texto não editável
                .setValue('Este campo não é para digitar. Olhe para a imagem no link acima.')
                .setRequired(false)
        );
        
        const captchaInput = new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId('input_captcha')
                .setLabel("Digite o código aqui")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("Digite os caracteres que você vê na imagem")
                .setRequired(true)
                .setMinLength(6)
                .setMaxLength(6)
        );

        // Infelizmente, o Discord não suporta imagens em modais.
        // A solução é enviar primeiro uma mensagem com a imagem e depois mostrar o modal.
        await interaction.reply({
            content: `**Aqui está o seu código de verificação:**\n${captchaImageUrl}`,
            ephemeral: true
        });

        // Aguarda um pouco para o utilizador ver a imagem antes de mostrar o modal
        setTimeout(() => {
            interaction.showModal(modal.setComponents(captchaInput));
        }, 2000);
    }
};