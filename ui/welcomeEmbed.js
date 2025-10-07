// ui/welcomeEmbed.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = function generateWelcomeEmbed(member, settings) {
    const embed = new EmbedBuilder()
        .setColor('#57F287') // Verde Discord
        .setAuthor({ name: `Boas-vindas, ${member.user.username}!`, iconURL: member.displayAvatarURL() })
        .setTitle(`Um novo membro chegou!`)
        .setDescription(`Temos o prazer de receber ${member} no servidor **${member.guild.name}**!\n\nPara garantir a melhor experiência e ter acesso a todos os nossos canais, o seu próximo passo é simples:`)
        .setThumbnail(member.guild.iconURL())
        .setImage('https://i.imgur.com/345s6yS.gif') // GIF/Imagem personalizável de boas-vindas
        .addFields({ name: 'Ação Necessária', value: 'Clique no botão abaixo para ir para o canal de verificação e seguir as instruções.' })
        .setTimestamp()
        .setFooter({ text: `Você é o nosso ${member.guild.memberCount}º membro!` });

    // O URL do botão agora aponta para o canal de verificação configurado
    const verificationChannelUrl = `https://discord.com/channels/${member.guild.id}/${settings.welcome_verification_channel_id}`;

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel('Comece por aqui!')
            .setStyle(ButtonStyle.Link)
            .setURL(verificationChannelUrl)
            .setEmoji('✅')
    );

    return { content: `🎉 Bem-vindo(a), ${member}!`, embeds: [embed], components: [row] };
};