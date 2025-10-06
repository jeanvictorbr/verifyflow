// ui/welcomeEmbed.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = function generateWelcomeEmbed(member, settings) {
    const embed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`Seja muito bem-vindo(a) ao ${member.guild.name}!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
        .setDescription(`Olá ${member}, que bom ter você por aqui!\n\nPara começar, recomendamos que se verifique para ter acesso a todos os nossos canais.`)
        .setImage('https://i.imgur.com/ECiLszt.gif') // Banner de boas-vindas
        .setTimestamp()
        .setFooter({ text: `Você é o nosso ${member.guild.memberCount}º membro!` });

    // Botão que leva para o canal de novidades/regras que configurámos anteriormente
    const newsChannelUrl = settings?.welcome_news_channel_id 
        ? `https://discord.com/channels/${member.guild.id}/${settings.welcome_news_channel_id}`
        : `https://discord.com/channels/${member.guild.id}`; // Link para o servidor se não houver canal de novidades

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel('Comece por aqui!')
            .setStyle(ButtonStyle.Link)
            .setURL(newsChannelUrl)
            .setEmoji('🔗')
    );

    return { content: `👋 Boas-vindas, ${member}!`, embeds: [embed], components: [row] };
};