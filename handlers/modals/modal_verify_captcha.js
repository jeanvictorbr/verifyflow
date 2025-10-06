// handlers/modals/modal_verify_captcha.js
const db = require('../../database.js');

module.exports = {
    customId: 'modal_verify_captcha_', // Handler dinâmico
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const correctCode = interaction.customId.split('_')[3];
        const userInput = interaction.fields.getTextInputValue('input_captcha').toUpperCase();

        // 1. Verifica se o código está correto
        if (userInput !== correctCode) {
            return interaction.editReply({
                content: '❌ **Código Incorreto!** Por favor, clique no botão "Verificar" novamente para tentar de novo.'
            });
        }

        // 2. Busca as configurações do servidor
        const settings = (await db.query('SELECT verification_role_id FROM guild_settings WHERE guild_id = $1', [interaction.guild.id])).rows[0];
        if (!settings || !settings.verification_role_id) {
            return interaction.editReply({
                content: '⚠️ O sistema de verificação não está configurado corretamente neste servidor. Por favor, contacte um administrador.'
            });
        }

        // 3. Atribui o cargo
        try {
            const role = await interaction.guild.roles.fetch(settings.verification_role_id);
            if (!role) {
                return interaction.editReply({ content: '⚠️ O cargo de verificado configurado não foi encontrado. Contacte um administrador.' });
            }

            await interaction.member.roles.add(role);

            await interaction.editReply({
                content: `✅ **Verificação concluída com sucesso!** Você recebeu o cargo ${role} e agora tem acesso ao servidor.`
            });

        } catch (error) {
            console.error("Erro ao atribuir cargo de verificação:", error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao tentar atribuir o seu cargo. É possível que o meu cargo seja inferior ao cargo de verificado. Por favor, contacte um administrador.'
            });
        }
    }
};